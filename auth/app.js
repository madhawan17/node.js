const users = [
  { username: "alice", password: "password123" },
  { username: "bob", password: "mypassword" }
];

const founduser = users.find((u) => u.username === inputUsername);

if (founduser && founduser.password === inputPassword) {
    
}

if (request.session.userId === founduser.username) {
    
}

function isAuthorized(req, res, next)  {
    if (req.session.role === "admin") {
        next();
    } else {
        res.send("unauthorized");
    } 
}

const isMatch = await bcrypt.compare(inputPassword, founduser.password);

if (isMatch) {
    res.send("login succesfull");
} else {
    res.send("invalid credentials");

}



function checkAdmin (req,res,next) {
    if (req.session.userRole === "admin") {
        next();
    
    } else {
        res.send("unauthorized");
    }
}