const express = require("express");
const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000

// app.use(cookieParser());

app.get("/", function (req,res) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("poloooio", salt, function(err, hash ){
            console.log(hash);
        })
    })
})


app.listen(3000, () => {
    console.log('server running');
});