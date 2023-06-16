//what the user see...
const path = require("path");
const express = require("express");

const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("this always run");
    res.sendFile(path.join(__dirname, "../", "views", "shop.html")); //express js dafault : text/html
});

module.exports = router;