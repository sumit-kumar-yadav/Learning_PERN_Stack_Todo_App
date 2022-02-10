import { Request, Response } from 'express';
const Category = require('../../Engine/Databases/category');
const { Op } = require("sequelize");


const fetchCategories = async (req: Request, res: Response) => {
    try {
        // Find all the contact lists and return them
        let categories = await Category.findAll();

        return res.status(200).json({
            message: "All categories",
            data: categories
        });
    } catch (err) {
        console.log("Error in fetching categories", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const createCategory =async (req: Request, res: Response) => {
    try {
        // console.log("Inside the createCategory", req.body);

        // Create a contact
        let category = await Category.create({
            type: req.body.type.toLowerCase()
        });
        
        return res.status(200).json({
            message: "New category created",
            data: category.toJSON()
        });
    } catch (err) {
        console.log("Error in creating category", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    createCategory,
    fetchCategories,
}