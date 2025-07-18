
const User = require("../Models/userSignUpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const userSignIn = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide email for login",
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please provide password for login",
            });
        }


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist. Please sign up.",
            });
        }


        // bcrypt

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Create JWT payload 
        const payload = {

            email: user.email,
            id: user._id,
            role: user.role

        };

        const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "1D" });

        // Set the token as a cookie and respond with success
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).status(200).json({
            success: true,
            message: "Login Successful",
            token: token, // Include token in response
            role: user.role, // Optionally include role in response
            error: false,
        });

    } catch (err) {
        console.error("Sign In Error: ", err); // Added logging for debugging
        return res.status(500).json({
            message: "Failed to sign in, please try again",
            error: err.message || err,
            success: false,
        });
    }
};

module.exports = userSignIn;
