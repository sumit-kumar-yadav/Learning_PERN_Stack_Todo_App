const express = require('express');
const { extractJWTtoken } = require('../Engine/Helpers/Middleware/extractJwtToken');

var router = express.Router();

router.use('/tasks', extractJWTtoken, require('./Routes/task'));
router.use('/category', extractJWTtoken, require('./Routes/category'));

router.use('/auth', require('./Routes/user'));

module.exports = router;
