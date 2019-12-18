import jwt from 'jsonwebtoken';

const getUser = (req, res, next) => {
  const accessToken = req.body.accessToken || req.get('Access-Token');

  if (!accessToken) {
    return next();
  }

  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (user.email) {
      req.user = user;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return next();
};

export default getUser;
