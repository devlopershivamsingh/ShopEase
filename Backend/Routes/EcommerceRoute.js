const express = require('express');
const router = express.Router();

const userSignUp = require("../Controller/UserSignUp");
const userLogin=require("../Controller/UserSignIn");
const authToken = require('../MiddleWare/AuthToken');
const userLogOut = require('../Controller/UserLogOut');
const allUsers = require('../Controller/AllUsers');
const userDetailsController = require('../Controller/UserDetails');
const updateUser = require('../Controller/UpdateUser');
const uploadProduct = require('../Controller/uploadProduct');
const getProduct = require('../Controller/getProduct');
const updateProduct = require('../Controller/UpdateProduct');
const productCategory = require('../Controller/ProductCategory');
const getCategoryWiseProduct = require('../Controller/GetCategoryWiseProduct');
const getProductDetails = require('../Controller/GetProductDetails');
const addCart = require('../Controller/AddToCart');
const allCartItem = require('../Controller/AllCartItem');
const deleteCartItem = require('../Controller/DeleteCartItem');
const addToCartCount = require('../Controller/AddToCartCount');



//Auth-Routes

router.post('/signup', userSignUp);
router.post('/login',userLogin)
router.get('/logout',userLogOut);




// Protected Routes -> Using Middalware


//User Routes

router.get('/user-details',authToken,userDetailsController)
router.get('/all-user',authToken,allUsers)
router.post("/update-user",authToken,updateUser)


//Product Routes

router.post("/product-upload",authToken,uploadProduct)
router.get("/get-product",getProduct);
router.post("/update-product",authToken,updateProduct);
router.get("/get-product-category",productCategory); // only category we getting from each 
router.post("/category-product",getCategoryWiseProduct);
router.post("/product-details",getProductDetails);



//Cart Routes

router.post("/add-to-cart",authToken,addCart)
router.get("/all-cart",authToken,allCartItem);
router.post("/delete-cart",authToken,deleteCartItem)
router.get("/add-to-cart-count",authToken,addToCartCount);


module.exports = router;
