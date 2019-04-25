'use strict';

import logger from './logger';

const bodyParser = (request) => {
  return new Promise((resolve, reject) => {
    if (request.method !== 'POST' && request.method !== 'PUT') {
      return resolve(request);
    }

    let message = '';
    request.on('data', (data) => {
      message += data.toString();
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(message);
        logger.log(logger.info, `Parsing a ${request.method} method`);
        return resolve(request);
      } catch (error) {
        return reject(error);
      }
    });

    request.on('error', (err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
      reject(err);
    });
    return undefined;
  });
};

export default bodyParser;
