import { Request, Response, NextFunction } from 'express';
const Category = require('../../Engine/Databases/category');
const Task = require('../../Engine/Databases/todo');
const { apiResponse } = require('../../Engine/Helpers/Api/apiResMessage');
const { Op } = require("sequelize");


const fetchTasks = async (req: Request , res: Response)=>{
    try{
        // Find all the contact lists and return them
        let tasks = await Task.findAll({ include: Category }); 

        // This will also retrieve soft-deleted records
        // let tasks = await Task.findAll({ include: Category, paranoid: false });

        apiResponse(res, 200, "All tasks", tasks);

    }catch(err){
        console.log("Error in fetching tasks", err);
        apiResponse(res, 500, "Internal server error");
    }
}

const fetchTasksByCategory = async (req: Request, res: Response) => {
    try {
        let category = req.params.category.trim().toLowerCase();
        // Find all the contact lists and return them
        let tasks = await Task.findAll(
            { 
                include: {
                    model: Category,
                    where: {
                        type: category
                    }
                }, 
            }
        );

        apiResponse(res, 200, `Tasks with category ${category}`, tasks);
    } catch (err) {
        console.log("Error in fetching tasks", err);
        apiResponse(res, 500, "Internal server error");
    }
}

const createTask = async (req: Request, res: Response) => {
    try {
        // console.log("Inside the body", req.body);

        // Create a contact
        let task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            CategoryId: req.body.CategoryId
        });
        
        // Return with the created task
        apiResponse(res, 200, "New task created", task.toJSON());

    } catch (err) {
        console.log("Error in creating a task", err);
        apiResponse(res, 500, "Internal server error");
    }
}


const updateTask = async (req: Request, res: Response) => {
    try {
        //  console.log("Inside the body of updateTask", req.body);
        await Task.update(req.body, {
            where: {
              id: req.params.id
            }
        });

        apiResponse(res, 200, "Task is updated", true);

    } catch (error) {
        console.log("Error in updating the contact", error);
        apiResponse(res, 500, "Internal server error");
    }
}

const deleteTask = async (req: Request, res: Response) => {
    try {
        let deleted = false;
        let task = await Task.findByPk(req.params.id);
        if(task) {
            await task.destroy();
            deleted = true;
        }

        apiResponse(res, 200, "Task is deleted", deleted);

    } catch (error) {
        console.log("Error in creating a task", error);
        apiResponse(res, 500, "Internal server error");
    }
}

module.exports = {
    createTask,     
    fetchTasks,  
    fetchTasksByCategory,   
    updateTask,     
    deleteTask,     
}