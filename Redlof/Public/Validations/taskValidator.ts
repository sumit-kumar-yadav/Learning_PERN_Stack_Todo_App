import { body, check, param  } from 'express-validator';
const { checkIfReqIsValid } = require('../../Engine/Helpers/Middleware/expressValidators');
const { isValidCategoryId, isValidTaskId, isValidDate } = require('../../Engine/Helpers/Utils/expressValidatorCustomFunctions');

module.exports.validateCreateTaskData = [
    check('title')
        .isLength({ min: 4, max: 25 }).withMessage('must be between 4 to 15 char long')
        .trim().notEmpty().withMessage('Title should not be empty'),
    check('description')
        .isLength({ min: 7, max: 50 }).withMessage('must be between 4 to 50 char long')
        .trim().notEmpty().withMessage('Description should not be empty'),
    check('due_date')
        .custom(isValidDate)
        .trim().isDate().withMessage('Must be a date'),
    check('CategoryId')
        .custom(isValidCategoryId)
        .trim().notEmpty().withMessage('Must provide a vald id of category'),
    checkIfReqIsValid
]

module.exports.validateUpdateTaskData = [
    param('id').custom(isValidTaskId),
    check('title')
        .isLength({ min: 4, max: 25 }).withMessage('must be between 4 to 15 char long')
        .trim().notEmpty().withMessage('Title should not be empty'),
    check('description')
        .isLength({ min: 7, max: 50 }).withMessage('must be between 4 to 50 char long')
        .trim().notEmpty().withMessage('Description should not be empty'),
    check('CategoryId')
        .custom(isValidCategoryId)
        .trim().notEmpty().withMessage('Must provide a vald id of category'),
    checkIfReqIsValid
]

module.exports.validateDeleteTask = [
    param('id').custom(isValidTaskId),
    checkIfReqIsValid
]