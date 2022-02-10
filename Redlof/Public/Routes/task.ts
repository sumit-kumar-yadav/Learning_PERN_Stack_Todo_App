import { Router } from 'express';
const { 
    filterTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../Controllers/task');
const { validateCreateTaskData, validateUpdateTaskData, validateDeleteTask, validateDates } = require('../Validations/taskValidator');
const { validateCategoty } = require('../Validations/categoryValidator');

const router = Router();

// To practice CRUD operation using Sequilize and postgres
router.get('/get-filtered-tasks', validateCategoty, validateDates, filterTasks);

router.post('/create-task', validateCreateTaskData, createTask);

router.put('/update-task/:id', validateUpdateTaskData, updateTask);

router.delete('/delete-task/:id', validateDeleteTask, deleteTask);

module.exports = router;