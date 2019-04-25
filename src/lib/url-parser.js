import url from 'url';
import queryString from 'querystring';

const urlParser = (request) => {
  request.url = url.parse(request.url);
  request.url.query = queryString.parse(request.url.query);
  return Promise.resolve(request);
};

export default urlParser;
