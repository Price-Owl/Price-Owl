const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const startCron = require("./src/cron/cron");

const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");

const dbConnect = require("./src/config/database");
dbConnect();
startCron();

app.listen(PORT, (req, res) => {
    console.log("App is listening on port 5000.")
})