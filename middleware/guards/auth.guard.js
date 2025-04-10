// guards/authGuard.js
const {
  verifyToken,
  isClient,
  isOwner,
  isAdmin,
} = require("../guards/roleGuard");

const authGuard = (roles = []) => {
  return (req, res, next) => {
    // Tokenni tekshirish
    verifyToken(req, res, () => {
      // Agar ro'yxat bo'lsa, foydalanuvchining rolini tekshirish
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).send({ message: "Ruxsat etilmagan rol" });
      }
      next();
    });
  };
};

module.exports = authGuard;
