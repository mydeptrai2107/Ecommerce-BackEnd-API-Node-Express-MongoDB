const { userAuth, adminAuth } = require("../middelware/middelware");
const cardController = require("../controllers/card-controller");
const cardRoutes = require("express").Router();
cardRoutes.post("/addToCard", userAuth, cardController.addNewCard);
cardRoutes.delete("/deleteCard/:id", userAuth, cardController.deleteCard);
cardRoutes.get("/getUserCard", userAuth, cardController.getUserCard);
cardRoutes.delete(
  "/deleteAllUserCard",
  userAuth,
  cardController.deleteAllUserCard
);
cardRoutes.patch("/updateCard/:id", userAuth, cardController.updateCard);
cardRoutes.get("/allCards", userAuth, adminAuth, cardController.showAllCards);
module.exports = cardRoutes;
