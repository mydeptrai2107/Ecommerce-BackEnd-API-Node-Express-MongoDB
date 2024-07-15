const cardModel = require("../DB/modules/card-model");
const orderModel = require("../DB/modules/order-model");
const productModel = require("../DB/modules/product-model");
const { resGenerator } = require("../helper/helper");
class Order {
  static addOrder = async (req, res) => {
    try {
      const userOrdersInfo = [];
      const userCard = await cardModel.find({
        userId: req.user._id,
        isOrdered: false,
      });
      const order = await orderModel.find({ userId: req.user._id });
      if (userCard.length == 0) throw new Error("You Don't Have Any Card");
      for (let i = 0; i < userCard.length; i++) {
        const product = await productModel.findOne({
          title: userCard[i].title,
        });
        if (!product) throw new Error(`Product ${userCard[i].title} Not Exist`);
        if (product.stock == 0) throw new Error("This Product Out Of Stock");
        if (product.stock < userCard[i].quantity)
          throw new Error(
            `You Cant  Add ${userCard[i].title} More Then Available Stock`
          );
        const userOrder = new orderModel({
          ...userCard[i]._doc,
          totalPrice: userCard[i].quantity * userCard[i].price,
        });
        await userOrder.save();
        userCard[i].isOrdered = true;
        await userCard[i].save();
        product.sold += userCard[i].quantity;
        product.stock -= userCard[i].quantity;
        await product.save();
        userOrdersInfo.push(userOrder);
        /////
        // await cardModel.findByIdAndDelete(userCard[i]._id);
      }
      return resGenerator(
        res,
        200,
        true,
        "Order Added Successfully",
        userOrdersInfo
      );
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static getUserOrders = async (req, res) => {
    try {
      const userOrders = await orderModel.find({ userId: req.user._id });
      if (userOrders.length == 0) throw new Error("You Don`t Have Orders");
      return resGenerator(res, 200, true, "User Orders", userOrders);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static deleteOrder = async (req, res) => {
    try {
      const order = await orderModel.findById(req.params.id);
      if (!order) throw new Error("Order Not Found");
      if (req.user._id.value != order.userId.value)
        throw new Error("You Can't Delete This Order");
      const product = await productModel.findOne({ title: order.title });
      if (!product) throw new Error("Product Not Found");
      product.sold -= order.quantity;
      product.stock += order.quantity;
      await product.save();
      const card = await cardModel.findById({ _id: order._id });
      if (!card) throw new Error("Card Not Found");
      card.isOrderDeleted = true;
      await card.save();
      // await cardModel.findByIdAndDelete(order._id);
      await orderModel.findByIdAndDelete(req.params.id);
      return resGenerator(res, 200, true, "Order Deleted Successfully", null);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static getUserOrderDeleted = async (req, res) => {
    try {
      const userDeletedOrders = await cardModel.find({
        userId: req.user._id,
        isOrderDeleted: true,
      });
      if (userDeletedOrders.length == 0)
        throw new Error("You Don`t Have Deleted Orders");
      return resGenerator(
        res,
        200,
        true,
        "User Deleted Orders",
        userDeletedOrders
      );
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
  static allDeletedOrders = async (req, res) => {
    try {
      const allDeletedOrders = await cardModel.find({
        isOrderDeleted: true,
      });
      if (allDeletedOrders.length == 0)
        throw new Error("Users Don`t Have Deleted Orders");

      resGenerator(res, 200, true, "Users Deleted Orders", allDeletedOrders);
    } catch (e) {
      return resGenerator(res, 500, false, e.message, "Bad request");
    }
  };
}
module.exports = Order;
