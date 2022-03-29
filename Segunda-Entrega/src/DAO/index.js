const MongoProductDao = require('./mongo/products.js');
const MongoCartDao = require('./mongo/carts.js');
const FirebaseProductDao = require('./firebase/products.js');
const FsProductDao = require('./fs/products.js')

const db = 'mongo';

let productDao;
let cartDao;

switch (db) {
    case 'mongo':
        productDao = MongoProductDao;
        cartDao = MongoCartDao;
        break;
    case 'fs':
        // productDao = FsProductDao;
        console.log("hola idiota")
        break;
    case 'firebase':
        // // productDao = FirebaseProductDao;
        console.log("hola idiota")
        break;
    default:
        break;
}

module.exports = {
    productDao,
    cartDao
};