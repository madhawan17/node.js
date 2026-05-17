// Question 4: Route Parameters
// Task: Create a GET endpoint /api/users/:id that returns a user by ID. If user not found, return 404.

// Expected Output:

// GET /api/users/1 → { "id": 1, "name": "John Doe", "email": "john@example.com" }
// GET /api/users/999 → Status: 404, { "error": "User not found" }


const express = require ("express");
const app = express();

users = [
    {id: 1, name: "john", email: "john@example.com"},
    {id: 2, name: "mad", email: "mad@example.com"}
];

app.get("/api/users/:id", (req,res)=> {
    const userId = parseInt(req.params.id);

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({error: "user not found"});

    }
    res.json(user);
    
});

app.listen(3000, ()=> {
    console.log('servver running on port 3000');
});