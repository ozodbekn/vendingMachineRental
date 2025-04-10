const {
  addNewPayment,
  findAllPayments,
  findPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/payments.controller");

const router = require("express").Router();

router.post("/", addNewPayment);
router.get("/", findAllPayments);
router.get("/:id", findPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
