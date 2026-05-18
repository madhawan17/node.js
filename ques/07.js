// Question 7: Error Handling Middleware
// Task: Create an error handling middleware that catches errors and returns a JSON error response.

// Expected Output:

// Error occurs → Response: { "error": "Internal Server Error", "status": 500 }

const express = require("express");
const app = express();

app.get("/api/error", (req,res) => {
    throw new Error("Something went wrong");

});

app.use((err, req, res, next) => {
    res.status(500).json({error: "Internal Server Error", status: 500});
    console.log(err);
    })

app.listen(3000, () => {
    console.log("running on port 3000");
});