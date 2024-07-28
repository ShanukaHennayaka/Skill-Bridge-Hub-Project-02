import jsonwebtoken from 'jsonwebtoken';
import config from 'config';


module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token.");

  try {
    const decoded = jsonwebtoken.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
