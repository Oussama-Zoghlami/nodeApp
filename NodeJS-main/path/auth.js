const express = require("express");
const router = express.Router();


router.get('/login',(req,res) => {
    res.send('<h1>Thank you for using our website</h1>');
});

router.get('/register', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

module.exports = router;