//add product ..  etc

const express = require("express");

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send("<form action='/admin/add-product' method='POST'><input name='title' type='text'></input><button type='submit'>Add</button></form>"); //express js dafault : text/html
});

//same as use , but only trigger when 'POST ' 
///admin/add-product =>POST to itself.
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); //jump to other url
});


module.exports = router;
