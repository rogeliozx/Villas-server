const Recorder = require('node-rtsp-recorder').Recorder;
const path = require('path');
const Visits = require('../models/Visits');
const registerVisit = (req, visit) => {
  const { codeHouse } = req.body;
};
const test = (req, res) => {
  res.json({ test: 'true' });
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
  test
};
