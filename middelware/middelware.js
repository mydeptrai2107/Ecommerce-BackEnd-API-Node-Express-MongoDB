const userModel = require("../DB/modules/user-model");
const jwt = require("jsonwebtoken");
const { resGenerator } = require("../helper/helper");
const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const userToken = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findOne({
      _id: userToken._id,
      "tokens.token": token,
    });
    if (!userData) throw new Error("UnAuthorized");
    req.user = userData;
    req.token = token;
    next();
  } catch (e) {
    resGenerator(res, 500, false, "UnAuthorized", null);
  }
};
const adminAuth = async (req, res, next) => {
  try {
    if (req.user.userType != "admin") throw new Error("Your Not An Admin");
    next();
  } catch (e) {
    resGenerator(res, 500, false, "UnAuthorized", null);
  }
};
module.exports = { userAuth, adminAuth };
