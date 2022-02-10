import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

module.exports.checkIfReqIsValid = (req: Request, res: Response, next: NextFunction)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const expressValidatorErrors = validationResult(req);
    if (!expressValidatorErrors.isEmpty()) {  // If data submitted are invalid
        // Return and send back the details of error in json format
        return res.status(400).json({ errors: expressValidatorErrors.array() });
    }
    next();
}