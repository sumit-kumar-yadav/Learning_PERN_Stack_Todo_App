import { Request, Response, NextFunction } from 'express';
const { apiResponse } = require('../Api/apiResMessage');
const jwt = require('jsonwebtoken');


module.exports.extractJWTtoken = (req: any, res: Response, next: NextFunction) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearerHeader is undefined
    if(bearerHeader){
        // Split at the space
        let bearer = bearerHeader.split(' ');
        // Get token from array
        let bearerToken = bearer[1];
        if(bearerToken){
            let decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
            // console.log("This is the decoded data extracted: ", decoded);

            // Set user object in the req to use it in controller
            req.user = decoded;
            next();
        }else{
            apiResponse(res, 400, "Valid token not found in header");
        }

    }else{
        apiResponse(res, 400, "No token found in header");
    }
}