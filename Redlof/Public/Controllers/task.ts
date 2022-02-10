import { Request, Response, NextFunction } from 'express';
const Category = require('../../Engine/Databases/category');
const Task = require('../../Engine/Databases/todo');
const { Op } = require("sequelize");


const fetchTasks = async (req: Request , res: Response)=>{
    try{
        // Find all the contact lists and return them
        let tasks = await Task.findAll({ include: Category }); 

        // This will also retrieve soft-deleted records
        // let tasks = await Task.findAll({ include: Category, paranoid: false });

        return res.status(200).json({
            message: "All tasks",
            data: tasks
        });

    }catch(err){
        console.log("Error in fetching tasks", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


const createTask = async (req: Request, res: Response) => {
    try {
        // console.log("Inside the body", req.body);

        // Create a contact
        let task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            category_id: req.body.category_id
        });
        
        // Return with the created task
        return res.status(200).json({
            message: "New task created",
            data: task.toJSON()
        });

    } catch (err) {
        console.log("Error in creating a contact", err);
        return res.status(500).json({
            message: "Internal server error"
        });
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

        return res.status(200).json({
            message: "Task is updated",
            data: true
        });

    } catch (error) {
        console.log("Error in updating the contact", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const deleteTask = async (req: Request, res: Response) => {
    try {
        let task = await Task.findByPk(req.params.id);
        if(task) await task.destroy();

        return res.status(200).json({
            message: "Task is deleted",
            data: task
        });
    } catch (error) {
        console.log("Error in creating a task", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    createTask,     
    fetchTasks,     
    updateTask,     
    deleteTask,     
}