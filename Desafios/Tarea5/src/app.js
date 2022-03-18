// Paquetes importados
const express = require('express');
app.use('/products', productsRouter);
const handlebars = require('express-handlebars');

// Inicializando Expreschastitys-app
const app = express();
app.use(express.static(__dirname + '/public'));

// Template engine (Handlebars)
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Middlewares
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Montando rutas
app.use('/products', productsRouter);

// Creando puerto
const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));