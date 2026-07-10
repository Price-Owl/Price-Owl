const mongoose = require('mongoose');

const productUrlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    initialPrice: {
        type: Number,  // Keep track of the original price when submitted
        required: true
    },
    priceHistory: [
        {
            price: Number,
            date: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('ProductUrl', productUrlSchema);