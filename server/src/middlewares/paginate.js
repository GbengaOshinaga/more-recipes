const paginate = (req, res, next) => {
  let { query: { from = 0, limit = 6 } = {} } = req;

  if (from < 0) {
    from = 0;
  }
  if (limit < 1) {
    limit = 6;
  }

  req.query.from = from;
  req.query.limit = limit;

  return next();
};

export default paginate;
