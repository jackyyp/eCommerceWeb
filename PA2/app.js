const express = require("express");

const app = express();

//top to bottom 
//1st middleware 
app.use((req, res, next) => {
    console.log("successful");
    next();
});

//path begin with this. need order specificity 
app.use('/users', (req, res, next) => {
    console.log("in users page");
    res.send("<h1>in users page</h1>")
})

app.use('/', (req, res, next) => {
    console.log("in main page");
    res.send("<h1>main page</h1>")
})



app.listen(3000);