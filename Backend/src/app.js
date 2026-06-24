const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: [
    //     "http://localhost:5173",
    //     "https://bank-transaction-system-nu.vercel.app"
    // ],
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const productRoutes = require("../src/routes/Product.routes");
const AuthRoutes = require("./routes/Auth.routes");

app.use("/api/product", productRoutes);
app.use("/api/auth", AuthRoutes);




module.exports = app;