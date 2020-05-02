const express = require('express');
const visit = express.Router();
const pictureController=require('../controllers/RegisterVisit');

visit.post('/register-visit',pictureController.takePicture);

module.exports = visit;