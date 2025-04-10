const { errorHandler } = require("../helpers/error_handler");
const Contracts = require("../models/contracts.model");

const addNewContract = async (req, res) => {
  try {
    const {
      client_id,
      owner_id,
      machine_id,
      start_date,
      end_date,
      monthly_fee,
      status,
    } = req.body;

    const newContract = await Contracts.create({
      client_id,
      owner_id,
      machine_id,
      start_date,
      end_date,
      monthly_fee,
      status,
    });

    res.status(201).send({ message: "New contract added", newContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllContracts = async (req, res) => {
  try {
    const contracts = await Contracts.findAll();
    res.status(200).send({ contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.findByPk(id);
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.update(req.body, { where: { id } });
    res.status(200).send({ message: "Contract updated", contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.destroy({ where: { id } });
    res.status(200).send({ message: "Contract deleted", contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewContract,
  findAllContracts,
  findContractById,
  updateContract,
  deleteContract,
};
