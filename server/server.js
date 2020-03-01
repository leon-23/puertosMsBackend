const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const  mongoUrl = require( './config/config');



const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//Configuracion de rutas
app.use( require('./routes/index') );
 
// parse application/json
app.use(bodyParser.json());


//Habilitar carpeta publica
//app.use(express.static(path.resolve(__dirname, '../public')));



async function start () {
 

const db = await mongoose.connect('mongo.exe mongodb://localhost:27017/manSolutions?authSource=12345 --username leon', { useNewUrlParser: true })
  

    
    app.listen(port, () => {
  		console.log('Escuchando el puerto: ', port);
    });  
}

start()