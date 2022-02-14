import { CustomValidator  } from 'express-validator';
const Category = require('../../Databases/category');
const Task = require('../../Databases/todo');
const User = require('../../Databases/user');


// Function to check if category id is valid or not
const isValidCategoryId: CustomValidator = async (value) => {
    let category = await Category.findByPk(value);
    // if category doesn't exist, then return with error message 
    if(!category) return Promise.reject('This category is not valid, First create it');
};

// Function to check if Task id is valid
const isValidTaskId: CustomValidator = async (value) => {
    let task = await Task.findByPk(value);
    if(!task) {
        return Promise.reject('This task id is invalid');
    }
}

// Function to check if category already exists
const isCategoryAlreadyExist: CustomValidator = async (value) => {
    let category = await Category.findOne({ where: { type: value.toLowerCase() } });
    // If this category is already present, then return with an error
    if(category) {
        return Promise.reject('This category already exists');
    }
}

const isValidDate: CustomValidator =async (value) => {
    let currentDate = new Date();
    let dueDate =  new Date(value);
    if(dueDate < currentDate){
        return Promise.reject(`Due date can't be less than today's date`);
    }
}

const isAlreadySignedUp: CustomValidator =async (email) => {
    let user = await User.findOne({ where: { email } });
    if(user){
        return Promise.reject(`This user is already present`);
    }
}

module.exports = {
    isValidCategoryId,
    isValidTaskId,
    isCategoryAlreadyExist,
    isValidDate,
    isAlreadySignedUp
}