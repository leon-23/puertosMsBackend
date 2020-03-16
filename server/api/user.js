const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
 =====================
	 Crear nuevo Usuario
 =====================
*/
const save = async (req, res)=>{

	const body = {
		email: req.body.email,
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10),
	};
	
	const user = new User(body)
	
	try{
		const data = await user.save();
		getData(res,200,data)

	}catch(error){
		console.log(error)
		msjError(res,500,error)
	}
}
/*
 =====================
	 Listado de Usuarios
 =====================
*/
const find = async (req, res)=>{
	try{
		const users = await User.find().sort('username');

		users.length 
		? getData(res, 200, users)
		: msjError(res, 401, 'no existen usuarios registrados')

	}catch(error){
		msjError(res,500,error)
	}
}

/*
 =====================
	 Login
 =====================
*/
const findByUsername = async (req, res)=>{
	try{
		const { username, password } = req.body;
		const user = await User.findOne({'username': username})
		
		user && bcrypt.compareSync(password, user.password)
		?  getData(res, 200, {
		    user,
			  token: getToken(user),
			 })
		
		: msjError(res, 401, 'Usuario y/o contraseña incorrectos')
	
	}catch(error){
		msjError(res,500,error)
	}
}

/*
 ==========================
	 Buscar Usuario por email
 ==========================
*/
const findByEmail = async (req, res)=>{
	try{
		const email = req.params.email;
		console.log(email)

		const user = await User.findOne({'email': email})
		getData(res, 200, user)
	
	}catch(error){
		msjError(res,500,error)
	}
}

//crea el token
const getToken = (user,)=>{
	const expiresIn = '48h'
	const token = jwt.sign({
           					user,
        					}, 
        					process.env.APP_SEED, {
        					expiresIn
        				})
   return token
}

//enviame mensaje de error
const msjError = (res, cod, message ) =>{
  return res.status(cod).json({
        message,
      });
}

//envia respuesta
const getData = (res, cod, users)=>{
  return res.status(cod).json({
      users
    });
}

module.exports = {
	save,
	find,
	findByUsername,
	findByEmail,
};