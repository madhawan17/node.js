import app from "./src/app.js";
import connectDB from "./config/database.js";

app.listen(2000, () => {
    console.log('server is running on port 2000');
})