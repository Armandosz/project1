const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('index.html', { title: 'Inicio'});
});

router.get('/about', (req, res) => {
    res.render('about.html', {title: 'Videos'})
})


router.get('/contact', (req, res) => {
    res.render('contact.html', {title: 'Contact'});
});

module.exports = router;