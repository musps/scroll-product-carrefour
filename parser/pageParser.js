const requestPromise = require('request-promise');

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    let opts = {
      uri: url
    };

    requestPromise(opts)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject('error');
      });
  });
};
