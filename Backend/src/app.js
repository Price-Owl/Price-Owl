const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://price-owl-olive.vercel.app" // apna actual Vercel URL
    ],
    credentials: true
}));

const productRoutes = require("../src/routes/Product.routes");
const AuthRoutes = require("./routes/Auth.routes");

app.use("/api/product", productRoutes);
app.use("/api/auth", AuthRoutes);




module.exports = app;