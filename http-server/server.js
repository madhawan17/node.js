const express = require('express');
const app = express();

app.get("/", (req,res) => {
    res.send ("hello from the server");
});

app.get("/user", (req,res) => {
    res.json ({
        Message: "hello from arya "
    })
});


app.get("/add", (req,res) => {
    let a= Number(req.query.a);
    let b= Number(req.query.b);
    res.json({
        sum: a + b
    });
});





app.use(express.json());

let tasks = [];

app.post("/tasks", (req, res) => {
    let newTask = req.body.task;

    tasks.push(newTask);

    res.json({
        message: "Task added successfully",
        task: newTask   

    })
});

app.get("/tasks", (req,res)=> {
    res.json(tasks)
});

app.listen(3000, (res,req) => {
    console.log('running on 3000'); 
});

