const jwtService = require("../../services/jwt.service");

const roleGuard = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Bearer token olish
      if (!token) return res.status(403).send({ message: "Token yo'q" });

      const decoded = jwtService.verifyAccessToken(token); // Tokenni tekshirish

      // Foydalanuvchi rolini tekshirish
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).send({ message: "Ruxsat etilmagan rol" });
      }

      req.user = decoded; // Foydalanuvchi malumotlarini so'rovga qo'shish
      next();
    } catch (error) {
      return res.status(403).send({ message: "Token noto'g'ri" });
    }
  };
};

module.exports = roleGuard;
