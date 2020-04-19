const Recorder = require('node-rtsp-recorder').Recorder;
const takePicture = async (req, res) => {
  const { codeHouse, day, year, hour, month } = req.body;
  console.log(req.body);

  const rec = new Recorder({
    url:'rtsp://rogelio:rogelio123@192.168.0.190:554/cam/realmonitor?channel=2&subtype=0',
    folder: './image',
    name: `${codeHouse}`,
    type: 'image',
    directoryPathFormat: `${year}`,
    fileNameFormat: `YYYY-M-D-h-mm-ss`,

  });

  rec.captureImage(() => {
    console.log('Image Captured ');
  });
  res.status(200).json({
    success: true,
    data: rec.fileNameFormat
  });
};

module.exports = {
  takePicture
};
