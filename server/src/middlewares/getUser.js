import jwt from 'jsonwebtoken';

const getUser = (req, res, next) => {
  const { accessToken } = req.signedCookies || {};

  if (!accessToken) {
    return next();
  }

  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (user.email) {
      req.user = user;
    }
  } catch (error) {
    // Verification failed, should still go to next handler
  }
  return next();
};

export default getUser;
