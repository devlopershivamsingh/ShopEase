const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    productNAME: { type: String, required: true },
    brandNAME: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    color: { type: String },
    weight: { type: Number },
    features: [String],
    warranty: { type: String },
    description: { type: String, required: true },
    productIMAGES: [{ url: String, public_id: String }],
    sellingPRICE: { type: Number, required: true },
    ratings: {
        averageRating: { type: Number, default: 0 },
        numberOfReviews: { type: Number, default: 0 },
        numberOfStars: { type: Number, default: 0, min: 0, max: 5 }
    },
    waterResistance: { type: String },
    materialUsed: { type: String },
    performance: { type: String },
    aiPower: { type: Boolean, default: false },
    releaseDate: { type: Date },
    environmentallyFriendly: { type: Boolean, default: false },
    isiCertified: { type: Boolean, default: false },
    countryOfOrigin: { type: String }

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
