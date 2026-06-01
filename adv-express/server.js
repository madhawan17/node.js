require('dotenv').config();
const express = require('express');
const { configCors } = require('./config/corsConfig');
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(configCors());
app.use(express.json());
app.use(requestLogger);
app.use(addTimeStamp);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('server is running i think');
});