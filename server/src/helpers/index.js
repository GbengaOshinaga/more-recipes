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
    dbCount = await model.findAndCountAll();
  } else {
    dbCount = await model.findAndCountAll({ where: condition });
  }
  return dbCount.count;
}

/**
 * Get pagination meta
 * @param {Object} req
 * @param {Model} model
 * @param {Object} condition
 *
 * @returns {Promise} pagination meta
 */
async function getPaginationMeta(req, model, condition) {
  let originUrl = req.originalUrl;
  if (req.originalUrl.indexOf('?') !== -1) {
    originUrl = req.originalUrl.slice(0, req.originalUrl.indexOf('?'));
  }

  const url = `https://${req.get('host')}${originUrl}`;
  const dbCount = await getCount(model, condition);
  const limit = Number(req.query.limit);
  const offset = Number(req.query.from);

  const paginationMeta = { from: offset, limit, total: dbCount };

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

export default getPaginationMeta;
