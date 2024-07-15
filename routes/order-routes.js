const orderRoutes = require("express").Router();
const orderController = require("../controllers/order-controller");
const { userAuth, adminAuth } = require("../middelware/middelware");

orderRoutes.post("/addOrder", userAuth, orderController.addOrder);
orderRoutes.get("/getUserOrders", userAuth, orderController.getUserOrders);
orderRoutes.delete("/deleteOrder/:id", userAuth, orderController.deleteOrder);
orderRoutes.get(
  "/deletedOrders",
  userAuth,
  orderController.getUserOrderDeleted
);
// admin routes
orderRoutes.get(
  "/allDeletedOrders",
  userAuth,
  adminAuth,
  orderController.allDeletedOrders
);

module.exports = orderRoutes;
