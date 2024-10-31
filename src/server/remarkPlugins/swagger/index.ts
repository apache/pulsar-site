// after modifying this file, run `npm run docusaurus clear` to clear the cache
import path from 'path';
import type {Transformer} from 'unified';
import type {Parent} from 'unist';
import type {Link} from 'mdast';
import fs from 'fs';

// Define available swagger file types
type SwaggerApiType = 'default' | 'functions' | 'lookup' | 'packages' | 'sink' | 'source' | 'transactions';

type PluginOptions = {
  baseDir: string;
  restApiBaseUrlMapping: Record<SwaggerApiType, string>;
  swaggerDir?: string;
};

// Add new return type for getSwaggerJson
type SwaggerResult = {
  version: string;
  json: any;
};

type Context = PluginOptions & {
  filePath: string;
  cache: {
    getSwaggerResult: (docPath: string, type?: SwaggerApiType) => SwaggerResult;
  };
};

type Target = [node: Link, index: number, parent: Parent];

function findLatestVersion(swaggerDir: string, majorMinor: string): string {
  try {
    const dirs = fs.readdirSync(swaggerDir)
      .filter(dir => dir.startsWith(majorMinor))
      .sort((a, b) => {
        // Sort versions in descending order
        const verA = a.split('.').map(Number);
        const verB = b.split('.').map(Number);
        for (let i = 0; i < 3; i++) {
          if (verA[i] !== verB[i]) return verB[i] - verA[i];
        }
        return 0;
      });
    
    return dirs[0] || majorMinor + '.0'; // Return latest or fallback
  } catch (error) {
    console.warn(`Failed to read swagger directory for ${majorMinor}:`, error);
    return majorMinor + '.0';
  }
}

function getSwaggerFileName(type: SwaggerApiType = 'default'): string {
  const fileNames: Record<SwaggerApiType, string> = {
    default: 'swagger.json',
    functions: 'swaggerfunctions.json',
    lookup: 'swaggerlookup.json',
    packages: 'swaggerpackages.json',
    sink: 'swaggersink.json',
    source: 'swaggersource.json',
    transactions: 'swaggertransactions.json'
  };
  return fileNames[type];
}

function createSwaggerCache(swaggerDir: string): {
  getSwaggerResult: (docPath: string, type?: SwaggerApiType) => SwaggerResult;
} {
  const versionCache: {
    [key: string]: {
      latestVersion: string;
      jsonCache: Map<string, SwaggerResult>;
    };
  } = {};

  return {
    getSwaggerResult: (docPath: string, type: SwaggerApiType = 'default') => {
      const versionMatch = docPath.match(/version-(\d+\.\d+\.x)/);
      const majorMinor = versionMatch ? versionMatch[1].replace('.x', '') : 'master';
      const cache = versionCache[majorMinor]?.jsonCache;
      
      const cacheKey = `${type}`;
      if (cache?.has(cacheKey)) {
        return cache.get(cacheKey)!;
      }

      try {
        const fileName = getSwaggerFileName(type);
        const version = majorMinor === 'master' ? 'master' : versionCache[majorMinor]?.latestVersion || findLatestVersion(swaggerDir, majorMinor);
        const filePath = path.join(swaggerDir, version, fileName);
        const jsonContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        const result: SwaggerResult = {
          version,
          json: jsonContent
        };

        if (!versionCache[majorMinor]) {
          versionCache[majorMinor] = {
            latestVersion: version,
            jsonCache: new Map()
          };
        }
        versionCache[majorMinor].jsonCache.set(cacheKey, result);
        
        return result;
      } catch (error) {
        console.error(`Failed to load swagger JSON for ${docPath} type ${type}:`, error);
        throw error;
      }
    }
  };
}

async function processLinkNode(target: Target, context: Context) {
  const [node] = target;
  if (!node.url || !node.url.startsWith("swagger:")) {
    return;
  }
  const pathname = node.url.split('?')[0].slice("swagger:".length);
  const queryString = node.url.split('?')[1];
  const queryParams = queryString 
    ? new Map(queryString.split('&').map(param => {
        const [key, value = ''] = param.split('=');
        return [decodeURIComponent(key).replace(/\+/g, ' '), decodeURIComponent(value).replace(/\+/g, ' ')] as const;
      }))
    : new Map();
  const relativePath = path.relative(context.baseDir, context.filePath);

  // Split the path into segments
  const segments = pathname.split('/').filter(Boolean);
  
  // Parse the path segments
  const isAdmin = segments[0] === 'admin';
  if (!isAdmin || segments.length < 2) {
    throw new Error(`Invalid swagger URL format: ${pathname}`);
  }

  // Extract components
  let apiVersion = segments[1];
  let apiType: SwaggerApiType = 'default';
  let operationName: string;

  if (segments.length === 3) {
    operationName = segments[2];
  } else {
    apiType = segments[2] as SwaggerApiType;
    operationName = segments[3];
  }

  const position = node.position ? ` ${relativePath} at position ${node.position.start.line}:${node.position.start.column}` : '';

  // Validate the subContext is a valid SwaggerFileType
  if (apiType !== 'default' && !getSwaggerFileName(apiType)) {
    throw new Error(`Invalid swagger sub-context: ${apiType}${position}`);
  }

  const swaggerResult = context.cache.getSwaggerResult(relativePath, apiType);
  const swaggerJson = swaggerResult.json;

  // Search through all paths in the swagger JSON
  let matches: { path: string; method: string; tags: string[]; summary?: string }[] = [];
  
  const tagParam = queryParams.get('tag') || 
    (operationName.startsWith('PersistentTopics_') ? '^persistent' : undefined);
  const summaryParam = queryParams.get('summary');

  // Handle negation separately from regex pattern
  const isTagNegated = tagParam?.startsWith('!') || false;
  const isSummaryNegated = summaryParam?.startsWith('!') || false;

  // Convert params to regex patterns without negation
  const tagRegex = tagParam && new RegExp(isTagNegated ? tagParam.slice(1) : tagParam);
  const summaryRegex = summaryParam && new RegExp(isSummaryNegated ? summaryParam.slice(1) : summaryParam);

  for (const [path, methods] of Object.entries(swaggerJson.paths || {})) {
    for (const [method, operation] of Object.entries(methods as Record<string, {
      operationId: string;
      tags: string[];
      summary?: string;
    }>)) {
      const tagMatches = !tagRegex || (operation.tags &&operation.tags.some(t => tagRegex.test(t)) !== isTagNegated);
      const summaryMatches = !summaryRegex || (operation.summary && summaryRegex.test(operation.summary) !== isSummaryNegated);
      if (operation.operationId === operationName && tagMatches && summaryMatches) {
        matches.push({ path, method, tags: operation.tags, summary: operation.summary });
      }
    }
  }

  if (matches.length === 0) {
    throw new Error(`Operation ${operationName} tag:${tagParam} summary:${summaryParam} not found in swagger JSON${position}`);
  }

  if (matches.length > 1) {
    console.warn(`Multiple operations found for ${operationName} tag:${tagParam} summary:${summaryParam}:\n${matches.map(m => `${m.method} ${m.path} tags:${m.tags.join(',')} summary:${m.summary}`).join('\n')}${position}`);
  }

  // Select the match with the longest path since there are duplicates
  const longestMatch = matches.reduce((longest, current) => 
    current.path.length > longest.path.length ? current : longest
  );

  const foundPath = swaggerJson.basePath + longestMatch.path;
  const foundMethod = longestMatch.method.toUpperCase();

  const restApiBaseUrl = context.restApiBaseUrlMapping[apiType];

  const swaggerVersion = swaggerResult.version;

  node.url = `${restApiBaseUrl}?version=${swaggerVersion}&apiVersion=${apiVersion}#operation/${operationName}`;

  node.children = [{
    type: "text",
    value: `${foundMethod} ${foundPath}`
  }];
}

export default function plugin(options: PluginOptions): Transformer {
  const swaggerDir = options.swaggerDir || path.join(options.baseDir, 'static/swagger');
  const cache = createSwaggerCache(swaggerDir);

  return async (root, vfile) => {
    const {visit} = await import('unist-util-visit');
    const context: Context = {
      ...options,
      filePath: vfile.path,
      cache,
    };
    const promises: Promise<void>[] = [];
    visit(root, 'link', (node: Link, index, parent) => {
      promises.push(processLinkNode([node, index, parent!], context));
    });
    await Promise.all(promises);
  };
}
