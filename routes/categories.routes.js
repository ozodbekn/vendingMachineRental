const {
  addNewCategory,
  findAllCategories,
  findCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");

const router = require("express").Router();

router.post("/", addNewCategory);
router.get("/", findAllCategories);
router.get("/:id", findCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
