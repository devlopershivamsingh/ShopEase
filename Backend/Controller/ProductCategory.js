// const Product = require("../Models/uploadProductModel");

// const productCategory=async(req,res)=>{

//     try{


//         const productByCategory=await Product.distinct("category");


//         console.log("product categary",productByCategory);


//         const firstProduct=[];

//         for(const category of productByCategory){
//             const product=await Product.findOne({category});
//             if(product)
//             {
//                 firstProduct.push(product);
//             }

//         }

//         res.status(200).json({
//             message: "Product fetch by category",
//             success: true,
//             error: false,
//             data: firstProduct,
//         });
//     }catch(err){
//         return res.status(400).json({
//             message: "No valid fields to update",
//             error: true,
//             success: false,
//           });
//     }
// }
// module.exports=productCategory;







// PICKING A EACH PRODUCT FROM ONE CATEGORY
const Product = require("../Models/uploadProductModel");
const productCategory = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        const firstProducts = [];

        for (const category of categories) {
            const product = await Product.findOne({ category });
            if (product) firstProducts.push(product);
        }

        res.status(200).json({
            message: "Products fetched by category",
            success: true,
            error: false,
            data: firstProducts,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error fetching products by category",
            error: true,
            success: false,
        });
    }
};

module.exports = productCategory;
