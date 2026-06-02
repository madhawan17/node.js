require("dotenv").config();
const express = require("express");
const { configCors } = require("./config/corsConfig");
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware");
const { globalErrorhandler } = require("./middleware/errorHandler");
const { urlVersioning } = require("./middleware/apiVersioning");
const { createBasicRateLimiter } = require("./middleware/rateLimiting");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(configCors());
app.use(express.json());

// simple health route to verify the server is responding
app.get("/", (req, res) => res.send("OK"));

app.use(requestLogger);
app.use(addTimeStamp);
app.use(createBasicRateLimiter(100, 15 * 60 * 1000)); // limit to 100 requests per 15 minutes
app.use(urlVersioning("v1"));
app.use("/api/v1", itemRoutes);

app.use(globalErrorhandler);

app.listen(PORT, () => {
  try {
    console.log(`server is running on port ${PORT}`);
  } catch (err) {
    console.error("Error starting the server:", err);
  }
});
