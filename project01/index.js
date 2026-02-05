const express = require ("express");
const app = express();
const fs = require ("fs");
const mongoose = require ("mongoose");
const users = require("./MOCK_DATA.json");
const PORT = 9000;

// connection
mongoose
.connect('mongodb://127.0.0.1:27017/finalNode')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('mongo error', err));

//schema 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
});

const user = mongoose.model("user", userSchema);

//middlewares
app.use(express.urlencoded({extended:false}));

 app.get("/api/users", (req,res) => {
    return res.json(users)
});

app.use((req,res, next) => {
    fs.appendFile("log.txt", `\n${Date.now()}:{req.ip} ${req.method}: ${req.method}: ${req.path} `, (err, data) => {
        next();
    } );
});


// routes 
app
.route("/api/users/:id")
.get( (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch( (req,res) => {
   
    return res.json({status: "pending"});
})
.delete( (req,res) => {
    return res.json({status: "pending"});
    
});

app.post("/api/users", async (req,res) => {
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({msg: "all fields are req"});
    }
     const result = await user.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
     })
    
    console.log('result', result);

    return res.status(200).json({msg: "db created"});

});


app.listen(PORT,() => {
    console.log('server connected succesfully');

});

