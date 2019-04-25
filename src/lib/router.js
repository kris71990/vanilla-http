'use strict';

import logger from './logger';
import bodyParser from './body-parser';
import urlParser from './url-parser';
import response from './response';

const Router = function router() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function get(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function post(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function put(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.del = function del(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = () => {
  return (req, res) => {
    return Promise.all([urlParser(req), bodyParser[req]])
      .then(() => {
        logger.log(logger.INFO, req.url.pathname);
        if (typeof this.routes[req.method][req.url.pathname] === 'function') {
          return this.routes[req.method][req.url.pathname](req, res);
        }
        return response.sendText(res, 404, '404 - Not Found');
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          return response.sendText(res, 404, '404 - Not Found');
        }
        return response.sendText(res, 400, '400 - Bad Request');
      });
  };
};

export default Router;
