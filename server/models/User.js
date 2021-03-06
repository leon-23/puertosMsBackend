
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
  values: ['ADMIN', 'BASIC'],
  message: '{VALUE} no es un rol válido' 
}

let Schema = mongoose.Schema;


let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'El username es requerido']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es requerido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  role: {
    type: String,
    default: 'BASIC',
    enum: validRoles
  },
  status: {
    type: Boolean,
    default: true
  },
});

userSchema.methods.toJSON = function () {

  let useraux = this;
  let userObject = useraux.toObject();
  delete userObject.password;

  return userObject;
}

userSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' })

module.exports = mongoose.model('User', userSchema);