const favoriteModel = require("../DB/modules/favorite-model");
const { resGenerator } = require("../helper/helper");

class Favorite {
    static addFavorite = async (req, res) => {
        try {
            const checkFavorite = await favoriteModel.findOne({
                userId: req.user._id,
                productId: req.params.id,
            });
            if (checkFavorite) throw new Error("Favorite Already Exist");
            const favorite = new favoriteModel({ userId:req.user._id, productId: req.params.id });
            await favorite.save();
            resGenerator(res, 200, true, "Favorite Created Successfully", favorite);
        } catch (e) {
            return resGenerator(res, 500, false, e.message, "Bad request");
        }
    };
    static showAllFavorite = async (req, res) => {
        try {
            const allFavorite = await favoriteModel.find(
                {
                    userId: req.user._id,
                }
            );   
            return resGenerator(res, 200, true, "All Favorite", allFavorite);
        } catch (e) {
            return resGenerator(res, 400, "Bad request", e.message);
        }
    };  
    static deleteFavorite = async (req, res) => {
        try {
            const result = await favoriteModel.findOneAndDelete({ userId: req.user._id, productId: req.params.id });
    
            if (!result) {
                return res.status(404).json({ error: "Favorite not found" });
            }
    
            res.status(200).json({ message: "Favorite deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}   

module.exports = Favorite;