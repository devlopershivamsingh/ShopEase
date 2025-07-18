const userSignUpModel = require("../Models/userSignUpModel");

const allUsers = async (req, res) => {
    try {


        const users = await userSignUpModel.find();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users, // Send all users
        });

    } catch (err) {
        console.error("Error fetching users:", err); 
        return res.status(500).json({
            message: err.message || "Failed to fetch users",
            error: true,
            success: false,
        });
    }
};

module.exports = allUsers;
