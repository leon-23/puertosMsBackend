const userApi = require('../api/user');
const express = require('express');

const api = express.Router();

//listado de usuarios
api.get('/usuarios', userApi.find);

//crear nuevo usuario
api.post('/register', userApi.save);

//login
api.post('/login', userApi.findByUsername)

//buscar usuario por email
api.get('/find/:email', userApi.findByEmail)

module.exports = api;