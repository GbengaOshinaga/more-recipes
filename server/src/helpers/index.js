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
  let originUrl = req.originalUrl;
  if (req.originalUrl.indexOf('?') !== -1) {
    originUrl = req.originalUrl.slice(0, req.originalUrl.indexOf('?'));
  }

  const url = `https://${req.get('host')}${originUrl}`;
  const dbCount = await getCount(model, condition);
  const limit = Number(req.query.limit);
  const offset = Number(req.query.from);

  let recipeId;
  if (req.params.id) {
    recipeId = req.params.id;
  }
  const paginationMeta = {
    recipeId, from: offset, limit, total: dbCount
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

/**
 * Check authorization and existence
 * @param {Object} obj
 * @param {Object} req
 * @param {Object} res
 * @param {String} message
 * @param {String} type
 *
 * @returns {Object} res
 */
export function check(obj, req, res, message, type) {
  if (!obj) {
    return res.status(404).jsend.fail({ message: `The ${message} does not exist` });
  }
  if (obj.UserId !== req.user.userId) {
    return res.status(401).jsend.fail({ message: `You are not authorized to ${type} this ${message}` });
  }
}
