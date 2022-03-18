const express = require('express');
const router = express.Router();
const ChampManager = require('../Manager/ChampManager.js');

const champService = new ChampManager();

router.get('/', (req, res) => {
    champService.getAllChamps().then(result => res.send(result));
})

router.post('/', (req, res) => {
    const champ = req.body;
    champService.addChamp(champ).then(result=>res.send(result));
})

router.delete('/:id', (req,res)=>{
    const id = req.params['id'];
    champService.deleteChamp(id).then(result=>res.send(result))
})

module.exports = router;