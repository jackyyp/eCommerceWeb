
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");


const app = express();

// excecuted for every request 
//1st middleware 
// app.use((req, res, next) => {
//     console.log("inside the middleware");
//     next(); // the request will  continue to next middleware 
// });

//**top to bottom **
//route to "/"

//parser
app.use(bodyParser.urlencoded({ extended: false }));

//the order matters!
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);