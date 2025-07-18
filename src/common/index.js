
const local="http://localhost:5000"
const render="https://deepshop.onrender.com"


const backendDomain=render
const summaryApi={

    signUp:{
        url:`${backendDomain}/api/v1/signup`,
        method:"post"
    },

    signIn:{
        url:`${backendDomain}/api/v1/login`,
        method:"post"
    },
    user:{
        url:`${backendDomain}/api/v1/user-details`,
        method:"get"
    },
    logout_user:{
        url:`${backendDomain}/api/v1/logout`,
        method:"get",
    },
    alluser:{
        url:`${backendDomain}/api/v1/all-user`,
        method:"get",
    },
    update_user:{
        url:`${backendDomain}/api/v1/update-user`,
        method:"post"
    },
    product:{
        url:`${backendDomain}/api/v1/product-upload`,
        method:"post"
    },
    all_product:{
        url:`${backendDomain}/api/v1/get-product`,
        method:"get"
    },
    update_product:{
         url:`${backendDomain}/api/v1/update-product`,
         method:"post"
    },
    category_product:{
        url:`${backendDomain}/api/v1/get-product-category`,
        method:"get"
    },
    category_wise_product:{
        url:`${backendDomain}/api/v1/category-product`,
        method:"post"
    },
    product_details:{
        url:`${backendDomain}/api/v1/product-details`,
        method:"post",
    },
    addToCart:{
        url:`${backendDomain}/api/v1/add-to-cart`,
        method:"post"
    },
    all_cart_item:{
        url:`${backendDomain}/api/v1/all-cart`,
        method:"get"
    },
    delete_item:{
         url:`${backendDomain}/api/v1/delete-cart`,
        method:"post"
    },
    add_to_cart_count:{
        url:`${backendDomain}/api/v1/add-to-cart-count`,
        method:"get"
    }
}

export default summaryApi