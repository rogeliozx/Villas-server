const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
  User_id: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    unique: false,
  },
  cellphone: {
    type: Number,
    unique: true,
  },
  extension: {
    type: Number,
    unique: false,
  },
  seccion: {
    type: Number,
    unique: false,
  },
  password: {
    type: String,
    unique: false,
  },
  curtStatus: {
    type: String,
    unique: false,
  },
  tastk: {
    type: String,
    unique: false,
  },
  code: {
    type: String,
    unique: false,
  },
  guest: {
    type: String,
    unique: false,
  },
  balance: {
    type: String,
    unique: false,
  },
});
usuarioSchema.methods.toJSON = () => {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('Users', usuarioSchema);
