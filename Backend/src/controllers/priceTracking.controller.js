const ProductUrl = require("../models/productUrl");
const {currentPriceTrackController} = require("../controllers/Product.controller");
const Tracking = require("../models/Tracking");
const User = require("../models/User");
const {sendPriceDropEmail} = require("../utils/mailSender");

const priceTracking  = async (req, res) => {
    try {
        const  allProducts = await ProductUrl.find();

        for (const product of allProducts) {
            const productUrl = product.productUrl;

            //scrapping current data for the url
            const productData = await currentPriceTrackController(productUrl);
            if (!productData || !productData.price) {
                console.log(`Failed to scrape ${productUrl}`);
                continue;
            }
            const price = productData.price;
            //agar price drop hua toh main kaam krenge
            //price drop hua, tb us product kp jitne user track kr rhe hai, un sb ko email bhejenge
            //phit current price bhi update krenge us product ke liye ProductUrl schema me
            if(price<product.currentPrice){
                //phle ab is product ka price bhi update krdo
                await ProductUrl.findOneAndUpdate({productUrl}, 
                    {
                        currentPrice: price,
                        $push: {
                            price: price
                        }
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
                        
                        //ab saare users ko mail bhej rhe hai, jb price drop hoga tb
                        try {
                            await sendPriceDropEmail(userEmail, 
                                product.productName, 
                                price, 
                                productUrl
                            );
                        } catch (error) {
                            console.error(`Failed to send email to ${userEmail}`, error);
                        }
                }
            }
        }
    } catch (error) {
        console.log("Error in priceTracking controller:", error);
    }
}

module.exports = {
    priceTracking
}