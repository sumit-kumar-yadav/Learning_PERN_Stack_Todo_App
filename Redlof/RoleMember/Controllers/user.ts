import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { apiResponse } = require('../../Engine/Helpers/Api/apiResMessage');
const User = require('../../Engine/Databases/user');


const signUpController = async (req: Request, res: Response) => {
    try {
        let { name, email, password, confirm_password } = req.body;
        // console.log("Inside the body", req.body);
        
        // validate password mismatch here
        if(password == confirm_password){
            // Hash the password
            const salt = bcrypt.genSaltSync(10);
            let hashedPassword = bcrypt.hashSync(password, salt);

            // Create the user
            let user = await User.create({
                name,
                email,
                password: hashedPassword
            });

            // create a jwt authentication token and send it to the client
            let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn:  '1h'});

            apiResponse(res, 201, "User signed up successfully. This is the token", token);
        }else{
            apiResponse(res, 400, "Password mismatch");
        }

    } catch (err) {
        console.log("Error while signing up", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const signInController = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ where: { email } });
        if(user){
            let hashedPassword = user.password;
            if(bcrypt.compareSync(password, hashedPassword)){
                // create a jwt authentication token and send it to the client
                let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn:  '1h'});

                apiResponse(res, 200, "Signed in successfully. Here is your token", token);
            }
            else apiResponse(res, 400, "Incorrect username or password");
        }else{
            apiResponse(res, 400, "Incorrect username or password");
        }
        
    } catch (err) {
        console.log("Error while signing up", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

module.exports = {
    signUpController,
    signInController
}