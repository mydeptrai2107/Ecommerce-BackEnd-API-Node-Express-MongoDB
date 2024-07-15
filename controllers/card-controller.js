const cardModel = require("../DB/modules/card-model");
const productModel = require("../DB/modules/product-model");
const { resGenerator } = require("../helper/helper");
class Card {
  static addNewCard = async (req, res) => {
    try {
      const cheackCard = await productModel.findOne({
        title: req.body.title,
      });
      if (!cheackCard) throw new Error("Product Not Found");
      const findCard = await cardModel.findOne({
        title: req.body.title,
        userId: req.user._id,
        isOrdered: false,
      });
      if (findCard) throw new Error("You Already Added This Card");
      if (cheackCard.stock == 0) throw new Error("This Product Out Of Stock");
      if (cheackCard.stock < req.body.quantity)
        throw new Error("You Cant Add More Then Available Stock");

      const userFullName = `${req.user.fName} ${req.user.lName}`;
      //   res.send(userFullName);
      const cardData = new cardModel({
        ...req.body,
        userName: userFullName,
        userId: req.user._id,
        size: req.body.size
      });
      await cardData.save();
      resGenerator(res, 200, true, "Card Created Successfully", cardData);
    } catch (e) {
      return resGenerator(res, 400, "Bad request", e.message);
    }
  };
  static deleteCard = async (req, res) => {
    try {
      await cardModel.findByIdAndDelete(req.params.id);
      return resGenerator(res, 200, true, "Card Deleted Successfully", null);
    } catch (e) {
      return resGenerator(res, 400, "Bad request", e.message);
    }
  };
  static getUserCard = async (req, res) => {
    try {
      const allUserCard = await cardModel.find({
        userId: req.user._id,
        isOrdered: false,
      });
      if (allUserCard.length == 0) throw Error("The User Don`t Have Any Cards");
      return resGenerator(res, 200, true, " User Card", allUserCard);
    } catch (e) {
      return resGenerator(res, 400, "Bad request", e.message);
    }
  };
  static updateCard = async (req, res) => {
    try {
      const card = await cardModel.findById(req.params.id);
      if (!card) throw Error("Card Not Found");
      await cardModel.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      const updateCard = await cardModel.findById(req.params.id);
      return resGenerator(res, 200, true, "Card Updated", updateCard);
    } catch (e) {
      return resGenerator(res, 400, "Bad request", e.message);
    }
  };
  static deleteAllUserCard = async (req, res) => {
    try {
      const userCards = await cardModel.deleteMany({ userId: req.user._id });
      if (userCards.deletedCount == 0)
        return resGenerator(res, 500, false, "User Don`t Have Card", null);
      //   res.send(userCards);
      return resGenerator(
        res,
        200,
        true,
        "All User Card Deleted Successfully",
        null
      );
    } catch (e) {
      return resGenerator(res, 400, "Bad request", e.message);
    }
  };
  static showAllCards = async (req, res) => {
    try {
      const allCards = await cardModel.find().populate("userId", "name email");
      return resGenerator(res, 200, true, "All Cards", allCards);
    } catch (e) {
      return resGenerator(res, 400, "Bad request", e.message);
    }
  };
}
module.exports = Card;
