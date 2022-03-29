const mongoose = require('mongoose');
const cartService = require('../../Models/mongo/cartsSchema.js');

mongoose.connect('mongodb+srv://teco:123@codercluster.rx1gy.mongodb.net/NoTenemosNada?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error('Cannot connect to MongoDB 😓');
    console.log('Carts\' collection connected 😎');
})

class CartsManager {
    count = async () => {
        const totalCount = await cartService.estimatedDocumentCount()
        return totalCount + 1
    }
    read = async () => {
        let cart = await cartService.find({}, {
            __v: 0,
            _id: 0
        })
        return {
            status: 'success',
            payload: cart,
        }
    }
    update = async (cart_id, cart_body) => {
        await cartService.updateOne({
            id: cart_id
        }, {
            $set: {
                name:cart_body.name,
                timestamp:cart_body.timestamp,
            }
        })
    }
}

module.exports = CartsManager;