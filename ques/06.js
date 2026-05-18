// Question 6: Middleware for Logging
// Task: Create a middleware that logs the HTTP method and URL of every request.

// Expected Output:

// GET /api/users → Console: "GET /api/users"
// POST /api/users → Console: "POST /api/users"


const express = require("express");

const app = express();

app.use((req, res, next) => {

    const method = req.method;
    const url = req.url;

    console.log(`${method} ${url}`);

    next();
});

app.get("/api/users", (req, res) => {

    res.json([
        { id: 1, name: "john" },
        { id: 2, name: "mad" }
    ]);

});

app.post("/api/users", (req, res) => {

    res.json({
        message: "User created"
    });

});

app.listen(3000, () => {
    console.log("running on port 3000");
});