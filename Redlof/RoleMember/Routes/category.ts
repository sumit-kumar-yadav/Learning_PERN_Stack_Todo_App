import { Router } from 'express';
const { createCategory, fetchCategories } = require('../Controllers/category');
const { validateCreateCategoryData } = require('../Validations/categoryValidator');

const router = Router();


// Routes
router.get('/get-all-categories', fetchCategories);
router.post('/create-category', validateCreateCategoryData, createCategory);

module.exports = router;