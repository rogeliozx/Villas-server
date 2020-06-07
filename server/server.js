const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../routes/index');
const path = require('path');
const { proxy } = require('rtsp-relay')(app);
const expressWs = require('express-ws')(app);
const mongoose = require('mongoose');

makeConnection = async () => {
  await mongoose.connect(
    'mongodb://localhost:27017/VillasMediterraneo',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    (err, res) => {
      if (err) throw err;
      console.log('Database online');
    }
  );
};
makeConnection().catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/api/face-cam', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/face.html'));
});

//rtsp

const handler = proxy({
  url: `rtsp://rogelio:rogelio123@192.168.100.190:554/cam/realmonitor?channel=2&subtype=0`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: true,
});
const faceCam = proxy({
  url: `rtsp://rogelio:rogelio123@192.168.100.190:554/cam/realmonitor?channel=1&subtype=0`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
});
app.ws('/stream', handler);
app.ws('/face', faceCam);

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
