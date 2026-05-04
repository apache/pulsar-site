// Expands {@inject:...} tokens in markdown source into markdown links.

// eslint-disable-next-line @typescript-eslint/no-var-requires
const urlConfig: {
  javadocUrl: string;
  restApiUrl: string;
  functionsApiUrl: string;
  sourceApiUrl: string;
  sinkApiUrl: string;
  packagesApiUrl: string;
  githubUrl: string;
  restApiBaseUrlMapping: Record<string, string>;
} = require("../../../site-baseurls");

const {
  javadocUrl,
  restApiUrl,
  functionsApiUrl,
  sourceApiUrl,
  sinkApiUrl,
  packagesApiUrl,
  githubUrl,
  restApiBaseUrlMapping,
} = urlConfig;

function injectLinkParse(prefix: string, name: string, path: string): {link: string; text: string} {
  if (prefix === "javadoc") return {link: javadocUrl + path, text: name};
  if (prefix === "github") return {link: githubUrl + "/tree/master/" + path, text: name};
  if (prefix === "rest") return {link: restApiUrl + "#" + path, text: name};
  if (prefix === "functions") return {link: functionsApiUrl + "#" + path, text: name};
  if (prefix === "source") return {link: sourceApiUrl + "#" + path, text: name};
  if (prefix === "sink") return {link: sinkApiUrl + "#" + path, text: name};
  if (prefix === "packages") return {link: packagesApiUrl + "#" + path, text: name};
  return {link: path, text: name};
}

function injectLinkParseForEndpoint(info: string): {text: string; link: string} {
  const parts = info.split("|");
  const method = parts[0];
  let path = parts[1];
  const suffix = parts[2] || "";

  const restPath = path.split("/");
  const restApiVersion = restPath[2];
  const restApiType = restPath[3];
  const restBaseUrl = restApiBaseUrlMapping[restApiType] || restApiUrl;

  let restUrl: string;
  if (suffix.indexOf("?version=") >= 0) {
    const [suffixPart, versionPart] = suffix.split("?version=");
    restUrl = `version=${versionPart}&apiversion=${restApiVersion}#${suffixPart}`;
    if (suffixPart.startsWith("operation/")) {
      path += suffixPart.slice("operation".length);
    }
  } else {
    restUrl = `version=master&apiversion=${restApiVersion}#${suffix}`;
    if (suffix.startsWith("operation/")) {
      path += suffix.slice("operation".length);
    }
  }

  return {
    text: `${method} ${path}`,
    link: `${restBaseUrl}?${restUrl}`,
  };
}

type Args = {filePath: string; fileContent: string};

export default function injectPreprocessor({fileContent}: Args): string {
  return fileContent.replaceAll(/{@inject:([^}]+)}/g, (_match, p1: string) => {
    const trimmed = p1.trim();
    const endpointPrefix = "endpoint|";
    let link: string;
    let text: string;
    if (trimmed.startsWith(endpointPrefix)) {
      ({link, text} = injectLinkParseForEndpoint(trimmed.substring(endpointPrefix.length)));
    } else {
      const [prefix, name, path] = trimmed.split(":");
      ({link, text} = injectLinkParse(prefix, name, path));
    }
    return `[${text}](${link})`;
  });
}
