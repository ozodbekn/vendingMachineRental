const { errorHandler } = require("../helpers/error_handler");
const Categories = require("../models/categories.model");

const addNewCategory = async (req, res) => {
  try {
    const { name, description, icon_url} =
      req.body;
    const newCategories = await Categories.create(req.body);
    res.status(201).send({ message: "New category added ", newCategories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.status(200).send({ categories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findByPk(id);
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.update(req.body, { where: { id } });
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.destroy({ where: { id } });
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { addNewCategory, findAllCategories, findCategoryById, updateCategory, deleteCategory };
