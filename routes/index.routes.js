const router = require("express").Router();
const ownersRouter = require("./owners.routes");
const adminsRouter = require("./admins.routes");
const clientsRouter = require("./clients.routes");
const machinesRouter = require("./machines.routes");
const categoriesRouter = require("./categories.routes");
const paymentsRouter = require("./payments.routes.js");
const statusRouter = require("./status.routes.js");
const contractsRouter = require("./contracts.routes.js");

router.use("/owners", ownersRouter);
router.use("/admins", adminsRouter);
router.use("/clients", clientsRouter);
router.use("/machines", machinesRouter);
router.use("/categories", categoriesRouter);
router.use("/payments", paymentsRouter);
router.use("/status", statusRouter);
router.use("/contracts", contractsRouter);

module.exports = router;
