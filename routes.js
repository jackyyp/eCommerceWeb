const fs = require('fs');

//request , response
const requestHandler = (req, res) => {
    //console.log(req.url, req.method, req.headers);    
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        //we need a name for input to get the value!
        res.write('<div>hi this is the main page.Please enter stuff</div>');
        res.write("<form action='/message' method='POST'> <input type='text' name='message'/><button type='submit'>send</button></form>");
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        //listen to certain event!! (data bus)
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk); // editing the data in obj , not obj itself.
        });

        //buffer (bus stop)
        // 'end' is when the request is done ! (internal registry)
        //never block a event loop for too long.
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //async function!!
            fs.writeFile('message.txt', message, (err) => {
                //executed when done the write 
                //never block the server.
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-type', 'text/html');
    //write multiple line of response.
    res.write("<div>Page Not Found</div>")
    res.end(); // we cant change a response after we end it!
}

// module.exports = requestHandler;
module.exports = {
    handler: requestHandler,
    defaultText: "testing route"
}