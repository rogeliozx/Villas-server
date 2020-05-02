const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const routes=require('../routes/index');
const path = require('path');
const { proxy } = require('rtsp-relay')(app);
const expressWs = require('express-ws')(app);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.use('/api', routes);


app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

//rtsp

const handler = proxy({
    url: `rtsp://rogelio:rogelio123@192.168.100.190:554/cam/realmonitor?channel=2&subtype=0`,
    // if your RTSP stream need credentials, include them in the URL as above
    verbose: false,
  });
  app.ws('/stream', handler);



app.listen(3001,  ()=> {
  console.log('Example app listening on port 3001!');
});