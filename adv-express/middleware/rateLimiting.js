const rateLimit = require('express-rate-limit');

const createBasicRateLimiter = (maxRequests, time ) => {
    return rateLimit({
        max : maxRequests, // maximum number of requests allowed within the time window
        windowMs : time, // time window in milliseconds
        message : 'Too many requests, please try again later.', // message to send when rate limit is exceeded
        standardHeaders : true, // return rate limit info in the `RateLimit-*` headers
        legacyHeaders : false, // disable the `X-RateLimit-*` headers
    })
}

module.exports = { createBasicRateLimiter };
