const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
  User_id: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  EMAIL: {
    type: String,
    unique: true,
  },
  "CIE / NOMBRE RECORDATORIO":{
      type:String,
      unique:false
  },
  TELEFONO:{
      type:Number,
      unique:true,
  },
  NOMBRE:{
      type:String,
      unique:false,
  },
  CELULAR:{
      type:Number,
      unique:true,
  },
  EXTENCION:{
      type:Number,
      unique:false,
  },
SECCION:{
    type:Number,
    unique:false,
},
PASSWORD:{
    type:String,
    unique:false,
},
"STATUS AL CORTE":{
    type:String,
    unique:false,
},
CONSIGNA:{
    type:String,
    unique:false,
},
"CODIGO DE ACCESO":{
    type:String,
    unique:false,
},
INVITADOS:{
type:String,
unique:false
},
});
usuarioSchema.methods.toJSON=()=>{
  const user=this;
  const userObject=user.toObject();
  delete userObject.password;
  return userObject;
}

module.exports = mongoose.model('Users', usuarioSchema);
