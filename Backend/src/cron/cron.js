const cron = require("node-cron");
const { priceTracking } = require("../controllers/priceTracking.controller");

const startCron = () => {
    // "0 */12 * * *" ka matlab hai har 12 ghante mein exact minute 0 par chalega (e.g. 12:00 AM aur 12:00 PM)
    cron.schedule("* * * * *", async () => {
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