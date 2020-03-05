const indexApi = require('../api/index');
const puertosApi = require('../api/puerto')

const express = require('express');
const api = express.Router();



api.get('/', indexApi);

api.get('/puertos', puertosApi.find)

api.get('/puertos/:id', puertosApi.findById)

api.delete('/puertos/:id', puertosApi.deletePuerto)

api.post('/puertos', puertosApi.save)

api.put('/puertos', puertosApi.update)

api.get('/puertos/find/:puerto', puertosApi.findByPort)

module.exports = api;