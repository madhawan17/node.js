const cluster = require("cluster");
const os = require("os");
const express = require("express");


const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const PORT = 3000;
    
    app.get("/", (req,res) => {
        return res.json({ message: `Hello from the server ${process.pid}`})
    });

    app.listen(PORT, () => 
    console.log(`Server started at port:${PORT}`)
);
}

