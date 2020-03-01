'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const PuertoSchema = new Schema({
  nombre     : { type: String, required: true },
  puerto     : { type: String , required: true, unique: true, },
  dominio    : { type: String , required: true },
  servidor   : { type: String, required: true }
})

module.exports =  mongoose.model('Puerto', PuertoSchema);