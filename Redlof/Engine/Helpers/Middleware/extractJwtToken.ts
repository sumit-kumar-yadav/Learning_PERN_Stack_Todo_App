import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

const { apiResponse } = require('../Api/apiResMessage');
const User = require('../../Databases/user');


module.exports.extractJWTtoken = async (req: any, res: Response, next: NextFunction) => {
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
            // Check if user exists in db or not
            if(decoded){
                let user = await User.findByPk(decoded.id);
                if(user){
                    // Set user object in the req to use it in controller
                    req.user = user;
                    next();
                }else
                    apiResponse(res, 400, "Valid token not found in header");
            }else{
                apiResponse(res, 400, "Valid token not found in header");
            }     
        }else{
            apiResponse(res, 400, "Valid token not found in header");
        }

    }else{
        apiResponse(res, 400, "No token found in header");
    }
}