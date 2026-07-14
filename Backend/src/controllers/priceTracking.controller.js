const ProductUrl = require("../models/productUrl");
const {currentPriceTrackController} = require("../controllers/Product.controller");
const Tracking = require("../models/Tracking");
const User = require("../models/User");

const priceTracking  = async (req, res) => {
    try {
        const  allProducts = await ProductUrl.find();

        for (const product of allProducts) {
            const productUrl = product.productUrl;

            //scrapping current data for the url
            const productData = await currentPriceTrackController(productUrl);
            if(!productData || !productData.price) {
                console.log("error in tracking controller::");
                return;
            }
            const price = productData.price;
            if(price<product.currentPrice){
                //phle ab is product ka price bhi update krdo
                await ProductUrl.findOneAndUpdate({productUrl}, 
                    {currentPrice: price},
                    {
                        $push: {price: price}
                    }
                )
                //ab saare users lo nikalo jo jo is product ko track kr rha hai
                const allUsersObj = await Tracking.find({
                    productId: product._id
                }).populate("userId");

                for (const tracker of allUsersObj) {

                        const user = tracker.userId;
                        if (!user) continue;
                        const userEmail = user.email;
                        console.log(`Sending mail to ${userEmail}`);
                        // await sendEmail({
                        // //     to: userEmail,
                        // //     subject: `Price Dropped for ${product.productName}`,
                        // //     text: `Good News! The price has dropped to ₹${price}.`
                        // // });
                }
            }
        }
    } catch (error) {
        console.log()
    }
}

module.exports = {
    priceTracking
}