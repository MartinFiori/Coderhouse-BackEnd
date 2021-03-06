const express = require('express');

const productsRouter = require('./routes/mongo/products.js');
const cartRouter = require('./routes/mongo/cart');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/carts', cartRouter);
app.use('/products', productsRouter);
app.get('*', (req, res) => {
    res.send({
        status: "error",
        error: `Couldn't find route ${req.url} 😢`
    })
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));