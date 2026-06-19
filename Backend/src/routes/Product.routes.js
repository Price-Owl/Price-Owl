const express = require("express");

const router = express.Router();
const productController =require("../controllers/Product.controller");
const AuthMiddleware = require("../middlewares/Auth.middleware");


router.post("/submit-url", AuthMiddleware.authMiddleware, productController.submitUrlController);


module.exports = router;