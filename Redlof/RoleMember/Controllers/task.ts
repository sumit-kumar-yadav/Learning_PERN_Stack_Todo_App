import { Request, Response } from 'express';
const Category = require('../../Engine/Databases/category');
const Task = require('../../Engine/Databases/todo');
const { apiResponse } = require('../../Engine/Helpers/Api/apiResMessage');
const { Op } = require("sequelize");
const { convetToCsv } = require('../../Engine/Helpers/Utils/json2csv');


const filterTasks =async (req: Request, res: any) => {
    try {
        // Get the submitted data from the query (if any)
        let { start_date, end_date, id}: any = req.query;

        let queryObj: any = {
            where: {},
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
        convetToCsv(tasks, res);

        // apiResponse(res, 200, "Tasks",tasks);

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
    filterTasks,
    updateTask,     
    deleteTask,     
}