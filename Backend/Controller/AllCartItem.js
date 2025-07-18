
// const addToCart = require('../Models/AddToCartModel');
// const Product = require('../Models/uploadProductModel');


// const allCartItem = async (req, res) => {

//     try {

//         const userId = req?.user?.id;
//         const cartItems = await addToCart.find({ userId }).populate('productId');

//         if (!cartItems.length) {
//             return res.status(404).json({
//                 message: "No items in the cart",
//                 error: true,
//                 success: false,
//             });
//         }


//         const populatedCartItems = await Promise.all(cartItems.map(async (cartItem) => {

//             const product = await Product.findById(cartItem.productId);
//             return {
//                 productId: cartItem.productId,
//                 productName: product.productNAME,
//                 brandName: product.brandNAME,
//                 category: product.category,
//                 images: product.productIMAGES,
//                 description: product.description,
//                 price: product.price,
//                 sellingPrice: product.sellingPRICE,
//                 quantity: cartItem.quantity
//             };

//         }));


//         // Respond with the cart items and product details
//         return res.status(200).json({
//             message: "Cart items retrieved successfully",
//             success: true,
//             cartItems: populatedCartItems,
//         });
//     } catch (err) {
//         return res.status(400).json({
//             message: "Error retrieving cart items",
//             error: err.message,
//             success: false,
//         });
//     }
// };

// module.exports = allCartItem;




const addToCart = require('../Models/AddToCartModel');
const Product = require('../Models/uploadProductModel');

const allCartItem = async (req, res) =>
{

    try {

        const userId = req?.user?.id;
        const cartItems = await addToCart.find({ userId });

        if (!cartItems.length) {
            return res.status(404).json({
                message: "No items in the cart",
                error: true,
                success: false,
            });
        }

        // For each cart item, manually fetch the product details

        const populatedCartItems = [];

        for (const cartItem of cartItems) {

            const product = await Product.findById(cartItem.productId);

            if (product) {
                populatedCartItems.push({
                    productId: product._id,
                    productName: product.productNAME,
                    brandName: product.brandNAME,
                    category: product.category,
                    images: product.productIMAGES,
                    description: product.description,
                    price: product.price,
                    sellingPrice: product.sellingPRICE,
                    quantity: cartItem.quantity
                });
            }
        }

        return res.status(200).json({
            message: "Cart items retrieved successfully",
            success: true,
            cartItems: populatedCartItems,
        });

    } catch (err) {
        return res.status(400).json({
            message: "Error retrieving cart items",
            error: err.message,
            success: false,
        });
    }
};

module.exports = allCartItem;
