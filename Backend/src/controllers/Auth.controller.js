const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register na dlogin controller working fine
const registerUserController = async  (req, res) => {
    try {
        //fetch details
        const {name, email, password, confirmPassword} = req.body;
        //validate input
        if(!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please proide all the details."
            })
        }
        //check if the user is already exists or not
        const user = await User.findOne({email:email});
        if(user) {
            return res.status(409).json({
                success: false,
                message: "User already registered, please login."
            })
        }
        //password check
        if(confirmPassword!=password){
            return res.status(400).json({
                success: false,
                message: "Incorrect password."
            })
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=await User.create({
            name,
            email,
            password: hashedPassword
        })
        console.log("newUser::", newUser);

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: newUser
        })
    } catch (error) {
       console.log("REGISTER ERROR =>", error);

    return res.status(500).json({
        success: false,
        message: error.message
    })
    }
}

const loginUserController = async (req, res) => {
    try {
        //fetch details
        const {email, password} = req.body;
        //validate input
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the deatils."
            })
        }
        //check if user exists or not
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Please register first."
            })
        }
        //verify password
        if(!await bcrypt.compare(password, user.password)){
            return res.status(404).json({
                success: false,
                message: "Incorrect pasword."
            })
        }
        //all clear now token generate
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET,
    {expiresIn:"1d"})

    return res.cookie("token", token,{
      httpOnly: true,     // Prevents JS access (more secure)
      secure: true,      // Set to true if using HTTPS
      sameSite: "none",    // Helps protect against CSRF
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }).status(200).json({
        success: true,
        message: "User logged in successfully.",
        user
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

const getMeController = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
                               .select("-password");


        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid user."
            })
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    getMeController
}