import { Request, Response } from 'express';
const Category = require('../../Engine/Databases/category');
const { Op } = require("sequelize");
const { apiResponse } = require('../../Engine/Helpers/Api/apiResMessage');


const fetchCategories = async (req: Request, res: Response) => {
    try {
        // Find all the contact lists and return them
        let categories = await Category.findAll();

        apiResponse(res, 200, "All categories", categories);
        
    } catch (err) {
        console.log("Error in fetching categories", err);
        apiResponse(res, 500, "Internal server error");
    }
}

const createCategory =async (req: Request, res: Response) => {
    try {
        // console.log("Inside the createCategory", req.body);

        // Create a contact
        let category = await Category.create({
            type: req.body.type.toLowerCase()
        });
        
        apiResponse(res, 200, "New category created", category.toJSON());
        
    } catch (err) {
        console.log("Error in creating category", err);
        apiResponse(res, 500, "Internal server error");
    }
}

module.exports = {
    createCategory,
    fetchCategories,
}