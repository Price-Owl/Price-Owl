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

module.exports = {
    submitUrlController
}