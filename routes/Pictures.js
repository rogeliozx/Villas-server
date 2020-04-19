const express = require('express');
const picture = express.Router();
const pictureController=require('../controllers/Pictures');

picture.post('/picture',pictureController.takePicture);

module.exports = picture;