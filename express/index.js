const http = require ("http")
const express = require ("express")

const app = express();

app.get("/", (req,res) => {
    return res.send("hello from the home page")
});

app.get("/about", (req,res) => {
    return res.send("hi from about page")
});

const myserver = http.createServer(app);

myserver.listen(8000, () => {
    console.log('server started');
});