'use strict';

import http from 'http';
import Router from './router';
import logger from './logger';


const router = new Router();

const app = http.createServer(router.route());

const startServer = () => {
  app.listen(process.env.PORT, () => {
    logger.log(logger.INFO, `Server listening on port ${process.env.PORT}`);
  });
};

const stopServer = () => {
  app.close(() => {
    logger.log(logger.INFO, 'Server shutting down, goodbye.');
  });
};

export { startServer, stopServer };
