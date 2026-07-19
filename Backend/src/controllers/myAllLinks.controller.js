const Tracking = require("../models/Tracking");
const productUrl = require("../models/productUrl");

const getMyAllTrackingDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "Unauthorised access.",
      });
    }

    //my tracking details me ek array aayega , jisme objects honge
    const myTrackingDetails = await Tracking.find({ userId: userId });
    if (!myTrackingDetails) {
      return res.status(401).json({
        success: false,
        message: "Interal server error",
      });
    }

    const allProductDetails = await Promise.all(
      myTrackingDetails.map(async (trackingDetail) => {
        return await productUrl.findById(trackingDetail.productId);
      }),
    );

    return res.status(200).json({
      success: true,
      message: "Successfully fetched your tracking details",
      allProductDetails: allProductDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = getMyAllTrackingDetails;
