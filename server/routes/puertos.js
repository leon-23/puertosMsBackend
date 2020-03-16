const express = require('express');
const puertosApi = require('../api/puerto');
const indexApi = require('../api/index');

const api = express.Router();

api.get('/', indexApi)

//rutas de los puertos

api.get('/puertos', puertosApi.find)

api.get('/puertos/:id', puertosApi.findById)

api.delete('/puertos/:id', puertosApi.deletePuerto)

api.post('/puertos', puertosApi.save)

api.put('/puertos', puertosApi.update)

api.get('/puertos/find/:puerto', puertosApi.findByPort)

module.exports = api;