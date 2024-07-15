const favoriteRoutes = require("express").Router();
const favoriteController = require("../controllers/favorite-controller");
const { userAuth } = require("../middelware/middelware");

favoriteRoutes.post(
  "/addFavorite/:id",
  userAuth,
  favoriteController.addFavorite
);
favoriteRoutes.get(
  "/allFavorite",
  userAuth,
  favoriteController.showAllFavorite
);
favoriteRoutes.delete(
  "/deleteFavorite/:id",
  userAuth,
  favoriteController.deleteFavorite
);

module.exports = favoriteRoutes;
