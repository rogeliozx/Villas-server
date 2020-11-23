const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../routes/index');
const path = require('path');
const mongoose = require('mongoose');

makeConnection = async () => {
  await mongoose.connect(
    process.env.urlDB,
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

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
