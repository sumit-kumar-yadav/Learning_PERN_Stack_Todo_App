var express = require('express');
import { Request, Response, NextFunction } from 'express';
var router = express.Router();

router.use('/tasks', require('./task'));
router.use('/category', require('./category'));

module.exports = router;
