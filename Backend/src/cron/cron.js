const cron = require("node-cron");
const { priceTracking } = require("../controllers/PriceTracking.controller");

const startCron = () => {
    cron.schedule("0 */6 * * *", () => {
        priceTracking();
        // console.log("Cron Job Running:", new Date().toLocaleString());
    });
    console.log("Cron Started");
};

module.exports = startCron;