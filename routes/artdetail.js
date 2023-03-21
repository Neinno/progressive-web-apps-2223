const express = require('express');
const dotenv = require("dotenv").config();
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:objectNumber', (req, res) => {
    const id = req.params.objectNumber;
    fetch(`${process.env.API_URL}/${id}?key=${process.env.API_TOKEN}`)
      .then(async response => {
        const data = await response.json();
        res.render('detail', { 
            data: data.artObject 
        });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching');
      });
  });

module.exports = router;