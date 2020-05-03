const Recorder = require('node-rtsp-recorder').Recorder;
const path = require('path');
const Visits = require('../models/Visits');
const Seccions = require('../models/Seccions');
const mongoose = require('mongoose');
const registerVisit = async (req, res) => {
    const { codeHouse, reason } = req.body;
  try {
    const data = await Visits.create({
      user_id: codeHouse,
      reason,
      user: codeHouse,
    });
    res.status(200).json({
      succes: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      error,
    });
  }
};

const getAllNameSeccions = async (req, res) => {
  try {
    const data = await Seccions.find({}, { _id: 0, name: 1 });
    res.status(200).json({
      succes: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error,
    });
  }
};

const takePicture = async (codeHouse, year) => {
  const rec = new Recorder({
    url:
      'rtsp://rogelio:rogelio123@192.168.100.190:554/cam/realmonitor?channel=2&subtype=0',
    folder: './image',
    name: `${codeHouse}`,
    type: 'image',
    directoryPathFormat: `${year}`,
    fileNameFormat: `YYYY-M-D-h-mm-ss`,
  });

  let folder = path.join(__dirname, '../');
  console.log(folder);

  rec.captureImage((file) => {
    console.log(file);
  });
};

module.exports = {
  takePicture,
  getAllNameSeccions,
  registerVisit,
};
