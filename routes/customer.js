const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('add-restaurant');
});

router.get('/123', (req, res, next) => {
    res.render('add-restaurant');
});

// router.post('/', (req, res, next) => {
//     res.redirect('/');
// });