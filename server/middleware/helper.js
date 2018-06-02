const logger = global.appObjectStore.logger;
/*
  to handle error
*/
module.exports.handleError = (res, n, str) => {
  switch (n) {
    case 400:
      res.status(400).send({ code: 400, error: 'bad_request', error_description: 'Bad Request!' });
      break;
    case 401:
      res.status(401).send({ code: 401, error: 'unauthorized_access', error_description: 'Un-authorized Request!' });
      break;
    case 500:
      res.status(500).send({ code: 500, error: 'internal_server_error', error_description: 'Internal Server Error!' });
      break;
    default:
      res.status(n).send({ code: n, error: 'invalid_request', error_description: str || 'Invalid request!' });
      break;
  }
};

/*
  to handle success
*/
module.exports.handleSuccess = (res, obj) => res.status(200).send(obj);