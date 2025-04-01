const mongoose = require('mongoose');
const UserModel = require('./userModel');
const ProductModel = require('./productModel');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  
        required: true
    }
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
