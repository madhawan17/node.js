const http = require ("http")
const fs = require ("fs")

/*
const server = http.createServer((req,res) => {
    res.write("hello from server") ;
    res.end ();
});

server.listen (3034, () => {
    console.log('running on 3000');

});
*/

const cserver = http.createServer((req,res) => {
    const log = `${Date.now()}: ${req.url} New req received\n`
    fs.appendFile ("log.txt", log, (err,data) => {
    res.end ("hello from cserver");   
    });
   
});

cserver.listen (5000, () => {
    console.log('running on 5000');

});
