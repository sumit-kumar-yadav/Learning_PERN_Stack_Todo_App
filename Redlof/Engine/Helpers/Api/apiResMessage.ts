import { Response } from 'express';

module.exports.apiResponse = (res: Response, statusCode: number, message: string, data: any)=>{
    return res.status(statusCode).json({
        message,
        data
    });
}