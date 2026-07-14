//isme sirf unique products ke links add honge
const mongoose = require('mongoose');
const User = require("../models/User");

const productUrlSchema = new mongoose.Schema({
    // allUsers:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     }
    // ],
    productUrl: {
        type: String,
        required: true,
        trim: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    currentPrice: {
        type: Number,  // Stored as a Number for easy calculations
        required: true
    },
    price:[
        {
        type: Number,
        required: true
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('ProductUrl', productUrlSchema);