const ProductUrlSchema = require("../models/productUrl");
const User = require("../models/User");

async function submitUrlController(req, res) {
    try {
        //fetch user details from middleware
        const user = await User.findById(req.user.id).select("-password");
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid user"
            })
        }
        console.log("user::", user);
        const {productUrl} = req.body;
        if(!productUrl){
            return res.status(401).json({
                success: false,
                message: "Please give product url."
            })
        }
        if (
           !productUrl.includes("amazon.") &&
           !productUrl.includes("flipkart.")
        ){
           return res.status(400).json({
           success: false,
           message: "Only Amazon and Flipkart URLs are supported.",
           });
        }

        await ProductUrlSchema.create({
            userId: user._id,
            productUrl: productUrl
        })

        await priceTrackController(productUrl);

        return res.status(200).json({
            success: true,
            message: "Url submitted successfull, waiting for price drop."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
} 

const getAllMyLinksController = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(500).json({
                success: false,
                message: "Invalid user."
            })
        }
        const productUrls = await ProductUrlSchema.find({
            userId: user._id,
        })

        return res.status(200).json({
            success: true,
            message: "All links fetched successfully",
            productUrls: productUrls
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Internal server error."
        })
    }
}

const priceTrackController = async (productUrl) => {
    try {
        console.log("recievedUrl::", productUrl);
    } catch (error) {
        console.log("Error in pricetrackcontroller::", error);
    }
}

module.exports = {
    submitUrlController,
    getAllMyLinksController,
    priceTrackController
}