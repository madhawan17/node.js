// Question 8: Basic Authentication Check
// Task: Create a middleware that checks for an Authorization header. If missing, return 401.

// Expected Output:

// Request without Authorization header → Status: 401, { "error": "Unauthorized" }
// Request with Authorization header → Proceeds to next middleware

const express = require("express");
const app = express();

