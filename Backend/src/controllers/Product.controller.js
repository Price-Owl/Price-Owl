const ProductUrlSchema = require("../models/productUrl");
const User = require("../models/User");
const axios = require("axios");
const cheerio=require('cheerio');

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
        console.log("product data::", productUrl);
        await currentPriceTrackController(productUrl);

        await ProductUrlSchema.create({
            userId: user._id,
            productUrl: productUrl,
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

const currentPriceTrackController = async (productUrl) => { 
    try {
        const {data} = await axios.get(
      "https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm6ac6485515ae4",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        },
      }
    );

    // console.log("Status:", response.status);
    // console.log(response.data);
    // console.log(data.substring(0, 1000));
    const $ = cheerio.load(data);

    console.log("TITLE:", $("title").text());

    console.log("PRODUCT TITLE:", $("span.B_NuCI").text());

    console.log("PRODUCT TITLE 2:", $("span.VU-ZEz").text());

    console.log("PRICE:", $("div.Nx9bqj").first().text());
//     const $ = cheerio.load(data);

// console.log("H1 Tags:");
// $("h1").each((i, el) => {
//   console.log($(el).text().trim());
// });

// console.log("-----------");

// console.log("Price Candidates:");
// $("*").each((i, el) => {
//   const text = $(el).text().trim();

//   if (/₹\s?[\d,]+/.test(text)) {
//     console.log(
//       $(el).prop("tagName"),
//       $(el).attr("class"),
//       text
//     );
//   }
// });
    } catch (error) {
        console.log("Error in pricecontroller.")
    }
};

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

module.exports = {
    submitUrlController,
    getAllMyLinksController,
    // currentPriceTrackController
}