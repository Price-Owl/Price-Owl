const express = require("express");

const router = express.Router();
const AuthController = require("../controllers/Auth.controller");
const AuthMiddleware = require("../middlewares/Auth.middleware");

router.post("/register", AuthController.registerUserController);
router.post("/login", AuthController.loginUserController);
router.get("/get-me", AuthMiddleware.authMiddleware, AuthController.getMeController);

module.exports = router;