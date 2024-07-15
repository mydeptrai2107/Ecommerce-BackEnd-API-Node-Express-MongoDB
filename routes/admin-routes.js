const adminRoutes = require("express").Router();
const adminController = require("../controllers/admin-controller");
const { userAuth, adminAuth } = require("../middelware/middelware");
adminRoutes.post("/adminLogin", adminController.adminLogin);
adminRoutes.post(
  "/addNewAdmin",
  adminController.addNewAdmin
);
module.exports = adminRoutes;
