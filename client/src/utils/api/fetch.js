import 'cross-fetch/polyfill';

export default (function() {
  /**
   * Fetch method
   * @param {String} url
   * @param {String} method
   * @param {Object} data
   * @param {Object} headers
   *
   * @returns {Promise} response
   */

  function commonFetch(url, method, data, headers = {}) {
    const defaultHeader = { 'Content-Type': 'application/json', ...headers };
    const options = { method, headers: defaultHeader, credentials: 'include' };

    if (data) {
      options.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    return fetch(url, options).then(response => {
      if (!response.ok) {
        return Promise.reject(response.json());
      }
      return response.json();
    });
  }

  /**
   * Get method
   * @param {String} url
   * @param {Object} headers
   *
   * @returns {Promise} response
   */
  function get(url, headers) {
    return commonFetch(url, 'get', null, headers);
  }

  /**
   * post method
   * @param {String} url
   * @param {Object} data
   * @param {Object} headers
   *
   * @returns {Promise} response
   */
  function post(url, data, headers) {
    return commonFetch(url, 'post', data, headers);
  }

  /**
   * put method
   * @param {String} url
   * @param {Object} data
   * @param {Object} headers
   *
   * @returns {Promise} response
   */
  function put(url, data, headers) {
    return commonFetch(url, 'put', data, headers);
  }

  /**
   * delete method
   * @param {String} url
   * @param {Object} headers
   *
   * @returns {Promise} response
   */
  function del(url, headers) {
    return commonFetch(url, 'delete', null, headers);
  }

  return {
    get,
    post,
    put,
    del
  };
})();
