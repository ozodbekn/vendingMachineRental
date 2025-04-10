const { addNewStatus, findAllStatus, findStatusById, updateStatus, deleteStatus } = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", addNewStatus);
router.get("/", findAllStatus);
router.get("/:id", findStatusById);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

module.exports = router;
