const express = require('express');
const visit = express();
const visitControllers=require('../controllers/RegisterVisit');

visit.post('/register-visit',visitControllers.registerVisit);
visit.get('/all,',visitControllers.getAllNameSeccions);

module.exports = visit;
