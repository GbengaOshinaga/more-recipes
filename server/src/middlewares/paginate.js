const paginate = (req, res, next) => {
  let { query: { from = 0, limit = 6 } = {} } = req;

  if (from < 0) {
    from = 0;
  }
  if (limit < 1) {
    limit = 6;
  }

  return next();
};

export default paginate;
