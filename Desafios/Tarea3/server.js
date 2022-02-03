const fs = require('fs');
const express = require('express');
const moment = require('moment');

const app = express();

const connecterServer = app.listen(8080, ()=>{
    console.log("Listening on port 8080");
});

let counter=0;
const path ='./files/products.json'



app.get('/', (req, res)=>{
    res.send('<h1 style="color:magenta;">Bienvenidos al servidor Express</h1>')
});

app.get('/products', async (req, res)=>{
    if (fs.existsSync(path)) {
        let dataRequest = await fs.promises.readFile(path, 'utf-8',null,2)
        res.send(dataRequest)
    }
});

app.get('/randomProduct',async (req,res)=>{
    // if (fs.existsSync(path)) {
        const dataRequest = await fs.promises.readFile(path, 'utf-8',null,2)
        const data =  JSON.parse(dataRequest)
        let randomNumber = Math.floor(Math.random()*(data.length))
        let randomUser = data[randomNumber]
        await fs.promises.writeFile('./files/products.txt',dataRequest,null,2)
        res.json(randomUser)
});

app.get('/user', (req,res)=>{
    res.send({
        user:"tincho",
        fullName:"Nicolás Fiori",
        age: 25,
        email: "matyco98@hotmail.com"
    })
});

app.get('/visitas', ((req,res)=>{
    counter++;
    res.send(`Has visitado este link ${counter} veces`)
}))


app.get('/fyh', ((req,res)=>{
    let m = moment();
    let date = m.format('DD/MM/YYYY hh:mm:ss a')
    res.send({
        fyh: date
    })
}))