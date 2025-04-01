const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: String,
    productImage: String,
    productCategory: String,
    productDescription: String,
    productReview: String,
    productColor: [String],  
    productSize: [String],   
    productNewPrice: Number,
    productOldPrice: Number,
    productHotStatus: Boolean  
});

const ProductModel = mongoose.model('Products', ProductSchema);

module.exports = ProductModel;
