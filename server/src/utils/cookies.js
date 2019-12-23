const options = {
  signed: true,
  ...(process.env.NODE_ENV === 'production'
    ? { secure: true, httpOnly: true }
    : {})
};

/**
 * Set cookie to response
 * @param {*} res - Response
 * @param {String} key - Cookie key
 * @param {String} value = Cookie value
 *
 * @returns {undefined}
 */
export const setCookie = ({ res, key, value }) => {
  res.cookie(key, value, options);
};

/**
 * Clears the specified cookie
 * @param {Object} res - Response
 * @param {String} key - Cookie name
 *
 * @returns {undefined}
 */
export const clearCookie = (res, key) => {
  res.clearCookie(key, options);
  return res.successResponse('Sign out successful');
};
