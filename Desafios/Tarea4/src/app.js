const express = require('express');
const petsRouter = require('./routes/Pets');

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/pets', petsRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));