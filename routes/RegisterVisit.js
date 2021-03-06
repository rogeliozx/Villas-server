const express = require('express');
const visit = express.Router();
const pictureController=require('../controllers/RegisterVisit');

visit.post('/register-visit',pictureController.takePicture);
visit.get('/all-names',pictureController.getAllNameSections);
visit.post('/new-visit',pictureController.registerVisit);
visit.get('/get-picture',pictureController.getImage);
visit.get('/users-sections',pictureController.getAllCodeSections);
module.exports = visit;