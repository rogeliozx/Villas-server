const mongoose = require('mongoose');
const makeConnection = async () => {
    try {
      await mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('connection succefuel');
      
    } catch (error) {
      console.log(error);
      
    }
  };
  module.exports=makeConnection;