const express = require('express');
const dotenv = require("dotenv").config();
const router = express.Router();
const fetch = require('node-fetch');

router.get('/offline', (req, res) => {
    res.render('offline', {
        title: 'Offline'
    });
})

module.exports = router;