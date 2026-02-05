const express = require ("express");
const app = express();
const fs = require ("fs");
const PORT = 9000;

const {logReqRes} = require('./middlewares')
const { connectMongoDb } = require("./connection")
const userRouter = require('./routes/user.js');

// connection
connectMongoDb("mongodb://127.0.0.1:27017/finalNode").then(() => 
console.log('mongodb connected'));

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT,() => {
    console.log('server connected succesfully');

});

