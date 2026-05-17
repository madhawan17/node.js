// Question 3: POST Endpoint with Body Parsing
// Task: Create a POST endpoint /api/users that accepts JSON data with name and email, and returns the created user with an id.

// Expected Output:

// Request: POST /api/users
// Body: { "name": "Alice", "email": "alice@example.com" }
// Response: { "id": 1, "name": "Alice", "email": "alice@example.com" }

const express = require ('express');

const app = express();

app.use(express.json());

app.post("/api/users", (req,res) => {

    const {name, email} = req.body;

    const newUser = {
        id : 1,
        name : req.body.name,
        email : req.body.email
    }
    res.json (newUser);
})

app.listen(3000, ()=> {
    console.log("running on port 3000")
});