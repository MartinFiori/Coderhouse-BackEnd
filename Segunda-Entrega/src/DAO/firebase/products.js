const admin = require('firebase-admin');

const key = require('../../utils/firebaseKey.json');

admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: 'https://Segunda-entrega-backend.firebaseio.com'
})

const db = admin.firestore();
const collection = db.collection('products')

class ProductsManager {
    create = async (product) => {
        let doc = collection.doc();
        if (!product.name || product.stock || product.precio) return "El producto necesita nombre, precio y stock"
        await doc.create(product)
        return {
            status: "success",
            msg: "New Product Created 🌈"
        }
    }
    read = async () => {
        const snapShot = await collection.get();
        let docs = snapShot.docs;
        let products = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            stock: doc.data().stock,
        }))
        return {
            status: "success",
            payload: products,
        }
    }
    update = async (id, body) => {
        const doc = collection.doc(id);
        await doc.update(body)
        return {
            status: "success",
            msg: "Product updated 🌈"
        }
    }
    delete = async (id) => {
        const doc = collection.doc(id);
        await doc.delete();
        return {
            status: "success",
            msg: "Product deleted 💀"
        }
    }
}



module.exports = ProductsManager;