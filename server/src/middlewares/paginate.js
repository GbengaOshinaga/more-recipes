const paginate = (req, res, next) => {
  let { query: { from = 0, limit = 9 } = {} } = req;

  if (from < 0) {
    from = 0;
  }
  if (limit < 1) {
    limit = 9;
  }

  req.query.from = from;
  req.query.limit = limit;

  return next();
};

export default paginate;
