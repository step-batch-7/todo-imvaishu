class App {
  constructor() {
    this.allRoutes = [];
  }

  insertIntoRouteChain(method, path, handlers) {
    const routes = handlers.map(handler => ({path, handler, method}));
    this.allRoutes.push(...routes);
  }
  get(path, ...handlers) {
    this.insertIntoRouteChain('GET', path, handlers);
  }

  post(path, ...handlers) {
    this.insertIntoRouteChain('POST', path, handlers);
  }

  use(...handlers) {
    this.insertIntoRouteChain(null, null, handlers);
  }

  serve(req, res) {
    process.stdout.write('Request: ' + req.url + ' ' + req.method + '\n');
    const matchesRequest = function({method, path}) {
      const isMatchedUrlMethod = req.method === method && req.url.match(path);
      return !method || isMatchedUrlMethod;
    };
    const routes = this.allRoutes.filter(matchesRequest);
    const handlers = routes.map(route => route.handler);
    const next = function() {
      const handler = handlers.shift();
      handler && handler(req, res, next);
    };
    next();
  }
}

module.exports = {App};
