import { Router } from 'express';
const { 
    fetchTasks, 
    createTask,
    updateTask,
    deleteTask
} = require('../Controllers/task');
const { validateCreateTaskData, validateUpdateTaskData, validateDeleteTask } = require('../Validations/taskValidator');

const router = Router();

// To practice CRUD operation using Sequilize and postgres
router.get('/get-all-tasks', fetchTasks);

router.post('/create-task', validateCreateTaskData, createTask);

router.put('/update-task/:id', validateUpdateTaskData, updateTask);

router.delete('/delete-task/:id', validateDeleteTask, deleteTask);

module.exports = router;