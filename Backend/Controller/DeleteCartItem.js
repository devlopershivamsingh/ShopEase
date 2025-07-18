
const addToCart = require('../Models/AddToCartModel');
const deleteCartItem = async (req, res) => {

    try {

        const { productId } = req.body;
        const userId = req.user?.id;
        console.log("product id",req);



        if (!productId || !userId) {
            return res.status(400).json({
                message: "Product ID and User ID are required",
                success: false,
            });
        }

        const deletedItem = await addToCart.findOneAndDelete({ productId, userId });


        if (!deletedItem) {
            return res.status(404).json({
                message: "Cart item not found",
                success: false,
            });
        }


        return res.status(200).json({
            message: "Cart item deleted successfully",
            success: true,
        });

    } catch (err)
    {

        return res.status(500).json({
            message: "Error deleting cart item",
            error: err.message,
            success: false,
        });
        
    }
};

module.exports = deleteCartItem;
