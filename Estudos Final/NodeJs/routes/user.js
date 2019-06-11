const express = require('express');

const indexController = require('../controllers/index');

const routers = express.Router();

routers.get('/teste', indexController.getNotes);

module.exports = routers

