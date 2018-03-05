/**
 * Middleware for pagination
*/
export default class Pagination {
  /**
     * Paginate
     * @param {Object} req
     * @param {Object} res
     * @param {func} next
     *
     * @returns {func} next
     */
  static paginate(req, res, next) {
    let offset = req.query.from ? req.query.from : 0;
    let limit = req.query.limit ? req.query.limit : 6;

    if (offset < 0) {
      offset = 0;
    }
    if (limit < 1) {
      limit = 6;
    }

    req.query.from = offset;
    req.query.limit = limit;

    return next();
  }
}
