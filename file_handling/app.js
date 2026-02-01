const fs = require("fs");

fs.writeFile("date.txt", "hello madhawan", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('file written succesfully');
    }
} );

fs.appendFile("data.txt","\n learning node.js" ,(err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("add new line");
    }
});