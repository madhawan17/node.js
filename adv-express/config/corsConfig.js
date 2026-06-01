const cors = require('cors');

const configCors = () => {
    return cors({
        // origin : this tells the server which domains are allowed to access the resources

        origin : (origin, callback) => {
            const allowedOrigins = [
                "http://localhost:3000",
            ]

            if(!origin || allowedOrigins.indexOf(origin) !== -1){
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },

        methods : ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
        allowedHeaders : [
            'Content-Type',
            'Authorization',
            'Accept-version',
        ],
        exposedHeaders : [
            'X-Total-Count',// headers that can be accessed by the client
            'Content-Range',
            ], 
        credentials : true, // allow cookies and authentication information to be sent with requests
        preflightContinue : false, // whether to pass the CORS preflight response to the next handler
        maxAge : 600, // how long the results of a preflight request can be cached by the client (in seconds)
        optionsSuccessStatus : 204, // the status code to send for successful OPTIONS requests

    })
}

module.exports = { configCors };