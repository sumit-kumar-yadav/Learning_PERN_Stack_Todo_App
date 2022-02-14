import { Request, Response } from 'express';
const Category = require('../../Engine/Databases/category');
const Task = require('../../Engine/Databases/todo');
const { apiResponse } = require('../../Engine/Helpers/Api/apiResMessage');
const { Op } = require("sequelize");
const { convetToCsv } = require('../../Engine/Helpers/Utils/json2csv');


const filterTasks =async (req: any, res: any) => {
    try {
        // Get the submitted data from the query (if any)
        let { start_date, end_date, id}: any = req.query;
        let userId = req.user.id;  // Extracted from jwt in middleware

        let queryObj: any = {
            where: { UserId: userId},
            include: {
                model: Category
            },
            raw: true,
            nest: true
        }

        // If start and end date are also chosen, then Modify where clause
        if(start_date && end_date){
            queryObj.where["due_date"] = { [Op.between]: [new Date(start_date), new Date(end_date)] }
        }

        // If category is also chosen, then Modify include object
        if(id) queryObj.include["where"] = {id}

        // Find all the tasks and return them
        let tasks = await Task.findAll( queryObj );
        
        // Convert json data to csv and send it to client
        // convetToCsv(tasks, res);

        apiResponse(res, 200, "Tasks", tasks);

    } catch (err) {
        console.log("Error in fetching tasks", err);
        apiResponse(res, 500, "Internal server error");
    }
}

const createTask = async (req: any, res: Response) => {
    try {
        let userId = req.user.id;  // Extracted from jwt in middleware

        // Create a contact
        let task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            CategoryId: req.body.CategoryId,
            UserId: userId
        });
        
        // Return with the created task
        apiResponse(res, 200, "New task created", task.toJSON());

    } catch (err) {
        console.log("Error in creating a task", err);
        apiResponse(res, 500, "Internal server error");
    }
}


const updateTask = async (req: any, res: Response) => {
    try {
        let userId = req.user.id;  // Extracted from jwt in middleware

        let task = await Task.update(req.body, {
            where: {
                [Op.and]: {
                    id: req.params.id,  // id = Task id
                    UserId: userId
                }
            }
        });

        apiResponse(res, 200, "Task is updated", task);

    } catch (error) {
        console.log("Error in updating the contact", error);
        apiResponse(res, 500, "Internal server error");
    }
}

const deleteTask = async (req: any, res: Response) => {
    try {
        let userId = req.user.id;  // Extracted from jwt in middleware

        let deleted = false;
        let task = await Task.findByPk(req.params.id);
        if(task && task.UserId == userId) {
            await task.destroy();
            deleted = true;
        }

        apiResponse(res, 200, "Task deleted", deleted);

    } catch (error) {
        console.log("Error in creating a task", error);
        apiResponse(res, 500, "Internal server error");
    }
}

module.exports = {
    createTask,     
    filterTasks,
    updateTask,     
    deleteTask,     
}