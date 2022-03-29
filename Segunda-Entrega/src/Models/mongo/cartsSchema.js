const mongoose = require('mongoose');

const collection = 'carts';
const schema = new mongoose.Schema({
    cart_id: {
        type: Number,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model(collection, schema);