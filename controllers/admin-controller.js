const userModel = require("../DB/modules/user-model");
const { resGenerator } = require("../helper/helper");
class Admin {
  static adminLogin = async (req, res) => {
    try {
      const adminData = await userModel.AdminLogin(
        req.body.email,
        req.body.password
      );
      const token = await adminData.generateToken();
      resGenerator(res, 200, true, "Login Success", { adminData, token });
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static addNewAdmin = async (req, res) => {
    try {
      const adminData = new userModel({ ...req.body, userType: "admin" });
      await adminData.save();
      resGenerator(res, 200, true, "Admin Created Successfully", adminData);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
}
module.exports = Admin;
