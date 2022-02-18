const express = require('express');
const router = express.Router();
const ProductsManager = require('../managers/products');
const uploader = require('../services/uploader');
const axios = require('axios');

const productService = new ProductsManager();

const requestData = async ()=>{
    const request = await fetch('../files/products.json');
    console.log(request)
    const data = await request.json();
    console.log(data)
    return data
}
router.get('/', (req, res) => {
    productService.getAllProducts().then(result => res.send(result))
})
router.get('/products', (req, res) => {
    axios({
        method:'GET',
        url: '../files/products.json'
    }).then(rta=>res.send(rta.data))
    return {status: "successs", content: "rta.data"}
})

router.post('/', uploader.single('file'), (req, res) => {
    const product = req.body;
    const file = req.file;
    if (!file) return res.status(500).send({
        error: "Couldn't find an image"
    })
    product.thumbnail = req.protocol + "://" + req.hostname + ":8080/assets/" + file.filename
    productService.addProduct(product).then(result => res.send(result));
})

router.get('/:id', (req, res) => {
    const req_id = req.params['id'];
    if (isNaN(req_id)) return res.status(500).send({
        error: "Invalid id"
    })
    productService.findProductById(req_id).then(prod => res.send(prod));
})

router.delete('/:id', (req, res) => {
    const req_id = req.params['id'];
    if (isNaN(req_id)) return res.status(500).send({
        error: "Invalid id"
    })
    productService.deleteById(req_id).then(prod => res.send(prod));
})


module.exports = router;