const productModel = require("../DB/modules/product-model");
const categoryModel = require("../DB/modules/category-model");
const { resGenerator } = require("../helper/helper");
class Product {
  static addNewProduct = async (req, res) => {
    try {
      const checkProduct = await productModel.findOne({
        title: req.body.title,
      });
      if (checkProduct) throw new Error("Product Already Exist");
      const findCategory = await categoryModel.findOne({
        name: req.body.category.toLowerCase(),
      });
      if (!findCategory) throw new Error("Category Not Find");
      const adminFullName = `${req.user.fName} ${req.user.lName}`;
      const productData = new productModel({
        ...{ ...req.body, category: req.body.category.toLowerCase() },
        productAddBy: adminFullName,
      });
      await productData.save();
      resGenerator(res, 200, true, "Product Created Successfully", productData);
    } catch (e) {
      return resGenerator(res, 500, false, "Bad request", e.message);
    }
  };
  static showAllProduct = async (req, res) => {
    try {
      const AllProducts = await productModel.find();
      resGenerator(res, 200, true, "All Products", AllProducts);
    } catch (e) {
      return resGenerator(res, 500, false, "Bad request", e.message);
    }
  };
  static getProductById = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) throw new Error("Product Not Found");
      resGenerator(res, 200, true, "Single Product", product);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static getProductByCategoryName = async (req, res) => {
    try {
      const productByCategory = await productModel.find({
        category: req.params.categoryName.toLowerCase(),
      });
      if (productByCategory.length == 0) throw new Error("Category not Find");
      resGenerator(res, 200, true, "Product By Category", productByCategory);
    } catch (e) {
      return resGenerator(res, 500, false, "Bad request", e.message);
    }
  };
  static editProduct = async (req, res) => {
    try {
      const findCategory = await categoryModel.findOne({
        name: req.body.category.toLowerCase(),
      });
      if (!findCategory) throw new Error("Category Not Find");
      const upDateProduct = await productModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body, category: req.body.category.toLowerCase() },
        { runValidators: true }
      );
      resGenerator(res, 200, true, "Product Updated", upDateProduct);
    } catch (e) {
      return resGenerator(res, 500, false, "Bad request", e.message);
    }
  };
  static deleteProduct = async (req, res) => {
    try {
      const deleteProduct = await productModel.findByIdAndDelete(req.params.id);
      if (!deleteProduct) throw new Error("Product Not Found");
      resGenerator(res, 200, true, "Product Deleted", null);
    } catch (e) {
      return resGenerator(res, 500, false, "Bad request", e.message);
    }
  };
}
module.exports = Product;
