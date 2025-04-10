const jwt = require("../../services/jwt.service");

const adminGuard = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Token kerak" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verifyAccessToken(token);

    if (decoded.role !== "admin") {
      return res.status(403).send({ message: "Ruxsat etilmagan" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Token noto'g'ri yoki muddati o'tgan" });
  }
};

module.exports = adminGuard;
