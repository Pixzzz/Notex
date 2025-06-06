const jwt = require("jsonwebtoken");

function authtenticateToken(req, res, next) {
  const authHeader = req.headers("authorization");
  const token = authHeader && authHeader.split(" ");

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

module.exports = { authtenticateToken };
