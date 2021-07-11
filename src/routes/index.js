const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/data/alldata', (req, res) => {
    res.render('data/alldata');
});

module.exports = router;