// Question 5: Query Parameters
// Task: Create a GET endpoint /api/search that accepts query parameters q and limit, and returns filtered results.

// Expected Output:

// GET /api/search?q=john&limit=5
// Response: Array of results matching "john" with max 5 items

const express = require("express");

const app = express();

users = [{id: 1, name: "john", email: "FJSIJFJSOFJO"},
    {id: 2, name: "mad", email: "KSKDSKFSP"}
];

app.get("/api/search", (req,res) => {
    const q = req.query.q;
    const limit = parseInt(req.query.limit) 
    const result = users.filter(u => u.name.includes(q)).slice(0, limit);
    res.json(result); 
})

app.listen(3000, ()=> {
    console.log("running on port 3000");
});