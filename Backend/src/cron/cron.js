const cron = require("node-cron");
const { priceTracking } = require("../controllers/priceTracking.controller");

const startCron = () => {
    cron.schedule("0 */6 * * *", async () => {
        console.log("Cron Started:", new Date().toLocaleString());

        try {
            await priceTracking();
            console.log("Price tracking completed.");
        } catch (err) {
            console.error("Cron Error:", err);
        }
    });

    console.log("Cron Scheduled Successfully.");
};

module.exports = startCron;