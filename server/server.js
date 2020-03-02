const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const  mongoUrl = require( './config/config');

var env = require('node-env-file');
env(__dirname + '/.env');

const app = express();
const port = process.env.PORT || 3000;

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
 

const db = await mongoose.connect(process.env.MONGO_URL,
		{
			useNewUrlParser: true,
		 	useCreateIndex: true, useUnifiedTopology: true },
        	(err, res) => {
        		if(err) throw err;

  				console.log("Base de datos online");

			}
)
     
    app.listen(port, () => {
  		console.log('Escuchando el puerto: ', port);
    });  
}

start()