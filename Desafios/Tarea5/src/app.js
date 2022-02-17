const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/products', productsRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.set('views', __dirname + './views');
app.set('view engine');