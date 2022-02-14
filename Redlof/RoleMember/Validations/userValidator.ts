import { body, check  } from 'express-validator';
const { checkIfReqIsValid } = require('../../Engine/Helpers/Middleware/expressValidators');
const { isAlreadySignedUp } = require('../../Engine/Helpers/Utils/expressValidatorCustomFunctions');

// Create user validator
module.exports.validateSignUpData = [
    check('name')
        .isLength({ min: 3, max: 15 }).withMessage('must be between 3 to 15 char long')
        .trim().notEmpty().withMessage('Name should not be empty'),
    check('password')
        .isLength({ min: 5, max: 20 }).withMessage('must be between 5 to 20 char long')
        .trim().notEmpty().withMessage('Password should not be empty'),
    check('confirm_password')
        .isLength({ min: 5, max: 20 }).withMessage('must be between 5 to 20 char long')
        .trim().notEmpty().withMessage('Password should not be empty'),
    check('email')
        .trim().notEmpty().withMessage('Must provide a vald email')
        .isEmail().withMessage('Must be an email')
        .custom(isAlreadySignedUp),
    checkIfReqIsValid
]

// Create session validator
module.exports.validateSignInData = [
    check('email')
        .trim().notEmpty().withMessage('Must provide a vald email')
        .isEmail().withMessage('Must be an email'),
    check('password')
        .isLength({ min: 5, max: 20 }).withMessage('must be between 5 to 20 char long')
        .trim().notEmpty().withMessage('Password should not be empty'),
    checkIfReqIsValid
]