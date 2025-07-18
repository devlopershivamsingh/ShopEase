const Product = require("../Models/uploadProductModel");

const getProductDetails = async (req, res) => {

  try{

    const { id } = req.body;

    // console.log("product id", id);

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      error: false,
      data: product,
    });

  } catch (err)
  {
    console.log("Error fetching product:", err);


    return res.status(400).json({
      message: "Error fetching product",
      error: true,
      success: false,
      details: err.message,
    });
  }

};

module.exports = getProductDetails;
