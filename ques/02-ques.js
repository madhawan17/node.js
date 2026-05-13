// Question 2: Basic GET Endpoint
// Task: Create a GET endpoint /api/users that returns a JSON array of users with id, name, and email fields.

// Expected Output:

// [
//   { "id": 1, "name": "John Doe", "email": "john@example.com" },
//   { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
// ]

const express = require('express');
const app = express();

app.get("/api/users",(req,res)=> {
    res.json([{"id": 1, "name": "john"}, {"id": 2, "name": "mad"}]);
})

app.listen(3000, ()=> {
    console.log("running on port 3000");
})