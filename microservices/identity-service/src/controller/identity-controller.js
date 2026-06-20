const logger = require('../utils/logger');
const validateRegistration = require('../utils/validator');

//User registration 
const registerUser = async(req, res) => {
    logger.info('registration endpoint hit')
    try{

        //validate the schema 
        const {error} = validateRegistration(req.body)
        if(error){
            logger.warn("validation error", error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            })
        }
    } catch (e) {}
}