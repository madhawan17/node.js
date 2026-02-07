const express = require("express");

const urlRoute = require("./routes/url");
const {connectToMongoDB} = require ("./connect");

app.use("/url",urlRoute);

const app = express();
const PORT = 5000;


app.listen(PORT, () => {
    console.log('server started at port 5000')
});