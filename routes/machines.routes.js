const {
  addNewMachine,
  findAllMachines,
  findMachineById,
  updateMachine,
  deleteMachine,
} = require("../controllers/machines.controller");

const router = require("express").Router();

router.post("/", addNewMachine);
router.get("/", findAllMachines);
router.get("/:id", findMachineById);
router.put("/:id", updateMachine);
router.delete("/:id", deleteMachine);

module.exports = router;
