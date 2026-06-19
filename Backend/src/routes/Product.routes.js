const express = require("express");

const router = express.Router();
const productController =require("../controllers/Product.controller");
const AuthMiddleware = require("../middlewares/Auth.middleware");


router.post("/submit-url", AuthMiddleware.authMiddleware, productController.submitUrlController);
router.get("/get-all-submitted-links", AuthMiddleware.authMiddleware, productController.getAllMyLinksController);


module.exports = router;