import querystring from 'querystring';

/**
 * Get query count
 * @param {*} model
 * @param {*} condition
 *
 * @returns {Number} count
 */
async function getCount(model, condition) {
  let dbCount;
  if (!condition) {
    dbCount = await model.count();
  } else {
    dbCount = await model.count({ where: condition });
  }
  return dbCount;
}

/**
 * Get pagination meta
 * @param {Object} req
 * @param {Model} model
 * @param {Object} condition
 *
 * @returns {Promise} pagination meta
 */
export async function getPaginationMeta(req, model, condition) {
  const {
    originalUrl,
    query: { limit: queryLimit, from },
    params: { id }
  } = req;

  let originUrl = originalUrl;
  if (originalUrl.indexOf('?') !== -1) {
    originUrl = originalUrl.slice(0, originalUrl.indexOf('?'));
  }

  const url = `https://${req.get('host')}${originUrl}`;
  const dbCount = await getCount(model, condition);
  const limit = Number(queryLimit);
  const offset = Number(from);

  let recipeId;
  if (id) {
    recipeId = id;
  }
  const paginationMeta = {
    recipeId,
    from: offset,
    limit,
    total: dbCount
  };

  const nextOffset = offset + limit;
  if (nextOffset < dbCount) {
    req.query.from = nextOffset;
    paginationMeta.next = `${url}?${querystring.stringify(req.query)}`;
  }

  const previousOffset = offset - limit;
  if (previousOffset > -1) {
    req.query.from = previousOffset;
    paginationMeta.previous = `${url}?${querystring.stringify(req.query)}`;
  }

  return paginationMeta;
}

export const getErrorResponse = error => {
  if (process.env.NODE_ENV === 'production') {
    // if it's a sequelize error, a generic message should
    // be returned
    if (error?.sql) {
      return 'An error occurred';
    }
  }

  return error;
};