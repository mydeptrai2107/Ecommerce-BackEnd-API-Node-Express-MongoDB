const categoryModel = require("../DB/modules/category-model");
const { resGenerator } = require("../helper/helper");
class Category {
  static addCategory = async (req, res) => {
    try {
      const checkCategory = await categoryModel.findOne({
        name: req.body.name,
      });
      if (checkCategory) throw new Error("Category Already Exist");
      const category = new categoryModel({ name: req.body.name.toLowerCase(), image: req.body.image });
      await category.save();
      resGenerator(res, 200, true, "Category Created Successfully", category);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static showAllCategory = async (req, res) => {
    try {
      const allCategory = await categoryModel.find();
      resGenerator(res, 200, true, "All Category", allCategory);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static showSingleCategory = async (req, res) => {
    try {
      const category = await categoryModel.findById(req.params.id);
      if (!category) throw new Error("Category Not Found");
      resGenerator(res, 200, true, "Single Category", category);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static deleteCategory = async (req, res) => {
    try {
      const category = await categoryModel.findByIdAndDelete(req.params.id);
      if (!category) throw new Error("Category Not Found");
      resGenerator(res, 200, true, "Category Deleted", null);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
}
module.exports = Category;
