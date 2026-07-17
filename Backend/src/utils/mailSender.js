const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        
        let info = await transporter.sendMail({
            from: `"PriceOwl - Price Drop Tracker" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body
        });

        console.log("Email Sent:", info.messageId);
        return info;
    } catch (error) {
        console.log(error);
    }
};

exports.sendPriceDropEmail = async (email, productName, price, productUrl) => {
    const title = `🔥 Price Dropped for ${productName}`;

    const body = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">

<div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:linear-gradient(135deg,#111827,#1f2937);padding:30px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:32px;">🦉 PriceOwl</h1>
        <p style="color:#d1d5db;margin-top:10px;">
            Smart Price Tracking • Instant Price Alerts
        </p>
    </div>

    <div style="padding:35px;">

        <h2 style="margin-top:0;color:#111827;">
            🎉 Great News!
        </h2>

        <p style="font-size:16px;color:#4b5563;line-height:1.7;">
            The product you're tracking has just become cheaper.
            Don't miss the opportunity before the price changes again.
        </p>

        <div style="
            background:#f9fafb;
            border-left:5px solid #10b981;
            border-radius:10px;
            padding:20px;
            margin:30px 0;
        ">

            <h3 style="margin-top:0;color:#111827;">
                ${productName}
            </h3>

            <p style="margin:8px 0;font-size:15px;color:#6b7280;">
                Current Price
            </p>

            <h1 style="
                margin:0;
                color:#10b981;
                font-size:42px;
            ">
                ₹${price}
            </h1>

        </div>

        <div style="text-align:center;margin:35px 0;">

            <a href="${productUrl}"
               style="
                display:inline-block;
                background:#111827;
                color:#ffffff;
                padding:15px 30px;
                border-radius:8px;
                text-decoration:none;
                font-size:16px;
                font-weight:bold;
               ">
               🔗 View Product
            </a>

        </div>

        <hr style="border:none;border-top:1px solid #e5e7eb;">

        <p style="font-size:14px;color:#6b7280;line-height:1.8;">

            You're receiving this email because you subscribed to price
            alerts on <strong>PriceOwl</strong>.

            <br><br>

            Our system continuously monitors product prices and instantly
            notifies you whenever a better deal becomes available.

        </p>

    </div>

    <div style="
        background:#f9fafb;
        text-align:center;
        padding:20px;
        color:#6b7280;
        font-size:13px;
    ">
        © ${new Date().getFullYear()} PriceOwl • Track Smarter, Save Bigger 🦉
    </div>

</div>

</body>
</html>
`;

    return await exports.mailSender(email, title, body);
};

exports.sendLoginSuccessEmail = async (email, name) => {
    const title = "✅ Login Successful - PriceOwl";

    const body = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">

<div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:linear-gradient(135deg,#111827,#1f2937);padding:30px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:32px;">🦉 PriceOwl</h1>
        <p style="color:#d1d5db;margin-top:10px;">
            Smart Price Tracking • Instant Price Alerts
        </p>
    </div>

    <div style="padding:35px;">

        <h2 style="margin-top:0;color:#111827;">
            Login Successful 🎉
        </h2>

        <p style="font-size:16px;color:#4b5563;line-height:1.7;">
            Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:16px;color:#4b5563;line-height:1.7;">
            Your PriceOwl account was successfully logged in.
        </p>

        <div style="
            background:#f9fafb;
            border-left:5px solid #3b82f6;
            border-radius:10px;
            padding:20px;
            margin:30px 0;
        ">
            <p style="margin:0;font-size:15px;color:#6b7280;">
                <strong>Login Time:</strong><br>
                ${new Date().toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "medium"
                })}
            </p>
        </div>

        <p style="font-size:15px;color:#4b5563;line-height:1.8;">
            If this login was you, no further action is required.
        </p>

        <p style="font-size:15px;color:#dc2626;line-height:1.8;">
            If you didn't log in to your account, please reset your password immediately.
        </p>

        <div style="text-align:center;margin:35px 0;">
            <a href="https://priceowl.vercel.app/login"
               style="
                display:inline-block;
                background:#111827;
                color:#ffffff;
                padding:15px 30px;
                border-radius:8px;
                text-decoration:none;
                font-size:16px;
                font-weight:bold;
               ">
               Visit PriceOwl
            </a>
        </div>

        <hr style="border:none;border-top:1px solid #e5e7eb;">

        <p style="font-size:14px;color:#6b7280;line-height:1.8;">
            Thank you for using <strong>PriceOwl</strong>.
            We're here to help you track prices and save money.
        </p>

    </div>

    <div style="
        background:#f9fafb;
        text-align:center;
        padding:20px;
        color:#6b7280;
        font-size:13px;
    ">
        © ${new Date().getFullYear()} PriceOwl • Track Smarter, Save Bigger 🦉
    </div>

</div>

</body>
</html>
`;

    return await exports.mailSender(email, title, body);
};