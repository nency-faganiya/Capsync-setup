const express = require('express');
// const {check} = require('express-validator');

const usersController = require('../controllers/users-controller');
// const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersController.getData);

router.post('/signup', usersController.signup);

router.post('/signin', usersController.signin);

module.exports = router;