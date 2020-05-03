const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Seccions = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    }
  } 
);
module.exports = mongoose.model('Seccions', Seccions);
