import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const { accessToken } = req.signedCookies || {};

  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (user.email) {
      req.user = user;
      return next();
    }
  } catch (error) {
    res.failResponse('Authentication is required to perform this request', 401);
  }
};

export default authenticate;
