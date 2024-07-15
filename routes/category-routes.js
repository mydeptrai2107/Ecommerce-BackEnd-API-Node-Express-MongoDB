const categoryRoutes = require("express").Router();
const categoryController = require("../controllers/category-controller");
const { userAuth, adminAuth } = require("../middelware/middelware");
categoryRoutes.post(
  "/addNewCategory",
  userAuth,
  categoryController.addCategory
);
categoryRoutes.get(
  "/allCategory",
  userAuth,
  categoryController.showAllCategory
);
categoryRoutes.get(
  "/showSingleCategory/:id",
  userAuth,
  adminAuth,
  categoryController.showSingleCategory
);
categoryRoutes.delete(
  "/deleteCategory/:id",
  userAuth,
  adminAuth,
  categoryController.deleteCategory
);
module.exports = categoryRoutes;
