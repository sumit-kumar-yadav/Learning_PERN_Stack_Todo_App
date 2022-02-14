var express = require('express');
var router = express.Router();

router.use('/tasks', require('./Routes/task'));
router.use('/category', require('./Routes/category'));
router.use('/auth', require('./Routes/user'));

module.exports = router;
