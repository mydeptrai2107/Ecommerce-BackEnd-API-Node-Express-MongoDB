const userModel = require("../DB/modules/user-model");
const { resGenerator } = require("../helper/helper");
const bcrypt = require("bcrypt");
class User {
  static addUser = async (req, res) => {
    try {
      //   const user = await userModel.create(req.body);
      const userData = new userModel(req.body);
      await userData.save();
      resGenerator(res, 200, true, "User Created Successfully", userData);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static login = async (req, res) => {
    try {
      const userData = await userModel.logMe(req.body.email, req.body.password);
      const token = await userData.generateToken();
      resGenerator(res, 200, true, "Login Success", { userData, token });
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static userProfile = async (req, res) => {
    try {
      resGenerator(res, 200, true, "userProfile", { data: req.user });
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static editProfile = async (req, res) => {
    try {
      const allowEdits = ["fName", "lName", "phone"];
      const reqKeys = Object.keys(req.body);
      const checkAllowEdits = reqKeys.every((ele) => {
        return allowEdits.includes(ele);
      });
      if (!checkAllowEdits)
        throw new Error("You Can just Edit [firstName , lastName , Phone]");
      await userModel.findByIdAndUpdate(req.user._id, req.body, {
        runValidators: true,
      });
      const userData = await userModel.findById(req.user._id);
      resGenerator(res, 200, true, "Edit Profile Success", userData);
    } catch (e) {
      //   resGenerator(res, 500, false, e, null);
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        token != req.token;
      });
      await req.user.save();
      resGenerator(res, 200, true, "Logout Success", null);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static deleteUser = async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.user._id);
      if (!user) throw new Error("User Not Found");
      resGenerator(res, 200, true, "User Deleted Successfully", null);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static changePassword = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (!user) {
        throw new Error("User Not Found");
      }

      const isOldPasswordMatch = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!isOldPasswordMatch) {
        throw new Error("Old Password Not Match");
      }

      if (req.body.newPassword != req.body.confirmPassword) {
        throw new Error("New Password Not Match");
      }
      const isValidPassword = await userModel.findByIdAndUpdate(
        req.user._id,
        { password: req.body.newPassword },
        { runValidators: true }
      );
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { password: hashedPassword, tokens: [] },

        { new: true }
      );
      resGenerator(
        res,
        200,
        true,
        "Password Changed Successfully",
        updatedUser
      );
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
}
module.exports = User;
