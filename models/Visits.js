const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Visits = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    picture:{
      type:Map,
      required:true
    }
  },
  { timestamps: { createdAt: 'created_at' } }
);
module.exports = mongoose.model('Visits', Visits);
