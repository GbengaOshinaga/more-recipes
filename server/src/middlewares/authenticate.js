import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const accessToken = req.body.accessToken || req.get('Access-Token');

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
