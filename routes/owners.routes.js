const { addNewOwner, findAllOwners, findOwnerById, updateOwner, deleteOwner } = require("../controllers/owners.controller");

const router = require("express").Router();

router.post("/", addNewOwner);
router.get("/", findAllOwners);
router.get("/:id", findOwnerById);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);

module.exports = router;
