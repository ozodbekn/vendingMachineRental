const { errorHandler } = require("../helpers/error_handler");
const Payments = require("../models/payments.model");

const addNewPayment = async (req, res) => {
  try {
    const {type, amount, is_transacted } =
      req.body;
    const newPayment = await Payments.create(req.body);
    res.status(201).send({ message: "New payment added ", newPayment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll();
    res.status(200).send({ payments });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.findByPk(id);
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.update(req.body, { where: { id } });
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.destroy({ where: { id } });
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { addNewPayment, findAllPayments, findPaymentById, updatePayment, deletePayment };
