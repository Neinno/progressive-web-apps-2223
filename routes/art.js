const express = require('express');
const dotenv = require("dotenv").config();
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', (req, res) => {
    fetch(process.env.API_URL + "?key=" + process.env.API_TOKEN + "&imgonly=true")
        .then(async response => {
            const data = await response.json()
            
            console.log(data)
            res.render('home', {
                data: data.artObjects
        })
    })
})


module.exports = router;