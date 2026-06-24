const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");

const dbConnect = require("./src/config/database");
dbConnect();

app.listen(5000, (req, res) => {
    console.log("App is listening on port 5000.")
})