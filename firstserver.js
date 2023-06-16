const http = require('http');
const routes = require('./routes')


//create a server
//event driven structure
console.log(routes.defaultText);

const server = http.createServer(
    routes.handler // execute this function 
);
server.listen(3000);
