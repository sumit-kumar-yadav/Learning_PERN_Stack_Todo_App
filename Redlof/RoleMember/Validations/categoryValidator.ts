import { body, check  } from 'express-validator';
const { checkIfReqIsValid } = require('../../Engine/Helpers/Middleware/expressValidators');
const { isCategoryAlreadyExist, isValidCategoryId } = require('../../Engine/Helpers/Utils/expressValidatorCustomFunctions');

module.exports.validateCreateCategoryData = [
    check('type')
        .custom(isCategoryAlreadyExist)
        .isLength({ min: 4, max: 12 }).withMessage('Must be between 4 to 12 char long')
        .trim().notEmpty().withMessage('Category should not be empty'),
    checkIfReqIsValid
]

module.exports.validateCategoryId = [
    check('id')
        .optional({ checkFalsy: true })
        .custom(isValidCategoryId),
    checkIfReqIsValid
]