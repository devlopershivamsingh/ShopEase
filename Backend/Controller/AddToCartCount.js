const addToCart = require('../Models/AddToCartModel');

const addToCartCount = async (req, res) => {
    try {

        const userId = req?.user?.id;


        const cartItems = await addToCart.find({ userId });

        if (!cartItems.length)
        {
            return res.status(404).json({
                message: "No items in the cart",
                error: true,
                success: false,
                totalQuantity: 0,
            });
        }

        // Calculate total quantity by summing up the quantity of each cart item

        let totalQuantity = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalQuantity += cartItems[i].quantity;
        }

        return res.status(200).json({
            message: "Total quantity of items in the cart",
            success: true,
            totalQuantity,
        });

    } catch (err)
    {

        return res.status(500).json({
            message: "Error calculating cart quantity",
            error: err.message,
            success: false,
        });
        
    }
};

module.exports = addToCartCount;
