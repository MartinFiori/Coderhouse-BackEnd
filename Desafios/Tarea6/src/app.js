const express = require('express');
const {
    Server
} = require('socket.io');
let moment = require('moment');
const ChampManager = require('./Manager/ChampManager.js');

const champService = new ChampManager();
const app = express();
app.use(express.static(__dirname + '/public'))
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(server);

const log = [];
io.on('connection', async socket => {
    console.log("conectado");
    let champs = await champService.getAllChamps();
    io.emit('champLog', champs)
    socket.emit("chatLog", log);
    socket.on('message', data => {
        data.time = moment().format("HH:mm DD/MM/YYYY")
        log.push(data);
        console.log(data);
        io.emit('chatLog', log)
    })
    socket.on('sentChamp', async (data) => {
        await champService.addChamp(data)
        let champs = await champService.getAllChamps();
        io.emit('champLog', champs);
    })
})