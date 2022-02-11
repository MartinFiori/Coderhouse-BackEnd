const express = require('express');
const router = express.Router();
const PetManager = require('../Managers/pets.js');
const uploader = require('../services/uploader');

const petService = new PetManager();
router.get('/', (req, res) => {
    petService.get().then(result => res.send(result));
})

router.post('/', uploader.single('file'), (req, res) => {
    let pet = req.body;
    let file = req.file;
    if (!file) return res.status(500).send({
        error: "couln't upload the file"
    })
    pet.thumbnail = req.protocol+"://"+req.hostname+":8080/assets/"+file.filename
    petService.add(pet).then(result => res.send(result));
})

module.exports = router;