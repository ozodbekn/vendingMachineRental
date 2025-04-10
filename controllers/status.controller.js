const { errorHandler } = require("../helpers/error_handler");
const Status = require("../models/status.model");

const addNewStatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newStatus = await Status.create(req.body);
    res.status(201).send({ message: "New status added ", newStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllStatus = async (req, res) => {
  try {
    const status = await Status.findAll();
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.update(req.body, { where: { id } });
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.destroy({ where: { id } });
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewStatus,
  findAllStatus,
  findStatusById,
  updateStatus,
  deleteStatus,
};
