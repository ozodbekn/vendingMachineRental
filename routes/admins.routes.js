const {
  addNewAdmin,
  findAllAdmins,
  findAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admins.controller");

const router = require("express").Router();
const verifyAdminToken = require("../middleware/verify_admin_token");

router.get("/admins", verifyAdminToken, findAllAdmins);
router.post("/admins", verifyAdminToken, addNewAdmin);

router.post("/", addNewAdmin);
router.get("/", findAllAdmins);
router.get("/:id", findAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
