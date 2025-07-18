const bcrypt = require("bcryptjs");
const User = require("../Models/userSignUpModel");

const userSignUp = async (req, res) => {
    try {



        const { name, email, password, uploadPic, role } = req.body;



        // Validate inputs
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please provide name",
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide email",
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please provide password",
            });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password

        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            console.error("Hashing error:", err);
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
                error: err.message,
            });
        }


        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            uploadPic,
            role:"general"
        });


        // Return success response

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });


    } catch (err) {
        
        console.error("Error during sign up:", err);
        return res.status(500).json({
            message: "Failed to sign up, please try again",
            error: err.message || err,
            success: false,
        });
    }
};

module.exports = userSignUp;
