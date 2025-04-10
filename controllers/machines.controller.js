const { errorHandler } = require("../helpers/error_handler");
const Machines = require("../models/machines.model");

const addNewMachine = async (req, res) => {
  try {
    const { status, location, name, model, description } =
      req.body;
    const newMachine = await Machines.create(req.body);
    res.status(201).send({ message: "New machine added ", newMachine });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllMachines = async (req, res) => {
  try {
    const machines = await Machines.findAll();
    res.status(200).send({ machines });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findMachineById = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machines.findByPk(id);
    res.status(200).send({ machine });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machines.update(req.body, { where: { id } });
    res.status(200).send({ machine });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machines.destroy({ where: { id } });
    res.status(200).send({ machine });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { addNewMachine, findAllMachines, findMachineById, updateMachine, deleteMachine };
