const express = require('express');
const dotenv = require("dotenv").config();
const router = express.Router();
const fetch = require('node-fetch');


router.post('/', (req, res) => {
    const searchInput = req.body.searchInput;
    console.log(searchInput)
    fetch(`${process.env.API_URL}?key=${process.env.API_TOKEN}&q=${searchInput}&ps=20&imgonly=true`)
      .then(async response => {
        const data = await response.json();
        res.render('search', { 
            data: data.artObjects,
            searchInput 
        });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching');
      });
  });

module.exports = router;