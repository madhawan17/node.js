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

//Routes
app.get('/users', async(req, res)=>{

    const allDbUsers = await user.find({});

    const html = `
    <ul>
    ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    <ul>
    `
    res.send(html)
})

//REST Api

app.get('/api/users', async(req, res)=>{

    const allDbUsers = await user.find({});
    return res.json(allDbUsers);

})

// routes 
app
.route("/api/users/:id")
.get(async (req,res) => {
    const user = await user.findById(req.params.id)
    if(!user) return req.status(404).json({error : 'User Not found'});
    return res.json(user);
})
.patch(async (req,res) => {
     await user.findByIdAndUpdate(req.params.id ,{ lastName:"Changed" } );
    return res.json({status: "pending"});
})
.delete(async (req,res) => {
    await user.findByIdAndDelete(req.params.id);
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

