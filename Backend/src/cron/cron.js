const cron = require("node-cron");

const startCron = () => {
    cron.schedule("*/1 * * * *", () => {
        console.log("Cron Job Running:", new Date().toLocaleString());
    });

    console.log("Cron Started");
};

module.exports = startCron;