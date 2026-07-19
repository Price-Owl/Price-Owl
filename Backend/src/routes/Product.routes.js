const express = require("express");

const router = express.Router();
const productController =require("../controllers/Product.controller");
const AuthMiddleware = require("../middlewares/Auth.middleware");
const getMyAllTrackingDetails = require("../controllers/myAllLinks.controller");


router.post("/submit-url", AuthMiddleware.authMiddleware, productController.submitUrlController);
router.get("/my-tracking-details", AuthMiddleware.authMiddleware, getMyAllTrackingDetails);


module.exports = router;