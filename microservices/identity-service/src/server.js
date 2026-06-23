require('dotenv').config()

const mongoose = require('mongoose');
const logger = require('./utils/logger');
const helmet = require('helmet');
const cors = require('cors');
const {RateLimiterRedis} = require('rate-limiter-flexible');


// connect to mongodb

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> logger.info('connected to mongodb'))
    .catch((e) => logger.info('mongodb connection error', e));



// middleware

app.use(helmet());
app.use(cors());
app.use(express.json());


app.use((req,res,next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);
    next();
});