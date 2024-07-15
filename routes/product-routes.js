const productRoutes = require("express").Router();
const productController = require("../controllers/product-controller");
const { userAuth, adminAuth } = require("../middelware/middelware");
productRoutes.post(
  "/addProduct",
  userAuth,
  productController.addNewProduct
);
productRoutes.get("/allProducts", userAuth, productController.showAllProduct);
productRoutes.get(
  "/getProductByCategoryName/:categoryName",
  userAuth,
  productController.getProductByCategoryName
);
productRoutes.get(
  "/getProductById/:id",
  userAuth,
  productController.getProductById
);

productRoutes.patch(
  "/upDateProduct/:id",
  userAuth,
  adminAuth,
  productController.editProduct
);
productRoutes.delete(
  "/deleteProduct/:id",
  userAuth,
  adminAuth,
  productController.deleteProduct
);
module.exports = productRoutes;
