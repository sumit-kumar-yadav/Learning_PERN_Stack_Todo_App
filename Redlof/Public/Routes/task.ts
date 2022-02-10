import { Router } from 'express';
const { 
    fetchTasks, 
    fetchTasksByCategory,
    fetchTasksByDateRange,
    createTask,
    updateTask,
    deleteTask
} = require('../Controllers/task');
const { validateCreateTaskData, validateUpdateTaskData, validateDeleteTask } = require('../Validations/taskValidator');
const { validateCategoty } = require('../Validations/categoryValidator');

const router = Router();

// To practice CRUD operation using Sequilize and postgres
router.get('/get-all-tasks', fetchTasks);
router.get('/get-tasks-by-category/:category', validateCategoty, fetchTasksByCategory);
router.get('/get-all-tasks-by-date', fetchTasksByDateRange);

router.post('/create-task', validateCreateTaskData, createTask);

router.put('/update-task/:id', validateUpdateTaskData, updateTask);

router.delete('/delete-task/:id', validateDeleteTask, deleteTask);

module.exports = router;