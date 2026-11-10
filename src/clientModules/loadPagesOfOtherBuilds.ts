import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { matchPath } from "@docusaurus/router";
import type { ClientModule } from "@docusaurus/types";
import routes from "@generated/routes";

type Route = {
  path?: string;
  exact?: boolean;
  strict?: boolean;
  routes?: Route[];
};

// The route that renders the page at `pathname`, like react-router-config's nested <Switch>es: the
// first matching route on each level, and nothing when a parent route matches but none of its child
// routes does.
function findPageRoute(routeList: Route[], pathname: string): Route | undefined {
  const route = routeList.find(
    (r) => !r.path || matchPath(pathname, { path: r.path, exact: r.exact, strict: r.strict })
  );
  if (!route) {
    return undefined;
  }
  return route.routes ? findPageRoute(route.routes, pathname) : route;
}

// The site is assembled from several Docusaurus builds: the docs of older versions are built
// separately from the rest of the site. A page from one build only knows the routes of that build,
// so following a link client-side to a page of another build, such as from the 4.2.x docs to the
// 5.0.x docs, rendered an empty page. Load such pages from the server instead.
const module: ClientModule = {
  onRouteUpdate({ location, previousLocation }) {
    if (!ExecutionEnvironment.canUseDOM || !previousLocation) {
      return;
    }
    if (location.pathname === previousLocation.pathname) {
      return;
    }
    const route = findPageRoute(routes as Route[], location.pathname);
    if (!route || route.path === "*") {
      window.location.replace(location.pathname + location.search + location.hash);
    }
  },
};

export default module;
