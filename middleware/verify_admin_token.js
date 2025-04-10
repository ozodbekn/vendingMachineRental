const jwt = require("jsonwebtoken");
const config = require("config");

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ message: "Token topilmadi" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).send({ message: "Token noto‘g‘ri formatda" });

  try {
    const decoded = jwt.verify(token, config.get("access_key"));
    if (decoded.role !== "admin") {
      return res.status(403).send({ message: "Admin ruxsati yo‘q" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Token noto‘g‘ri yoki eskirgan" });
  }
};

module.exports = verifyAdminToken;
