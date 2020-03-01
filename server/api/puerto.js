const Puerto = require('../models/Puerto')

// =====================
// Crear nueva Puerto
// =====================

const save = async (req, res) =>{

  const body = req.body;
  const puertoS = new Puerto({ ...body });
  
  try{
    const data = await puertoS.save(puertoS)

    getData(res, data, 201);

  }catch(error){
    msjError(res, 500, {message: 'Ups! hemos cometido un error', error: error.toString()})
  } 
}

// ===================================
// Listar Puerto ordenados por nombre
// ===================================


const find = async (req, res) => {
    //debug(`Finding Ports  with limit.`)
    const  data =  await Puerto.find().sort('nombre');
   
    try{
      !data.length 
      ? msjError(res,404,{message: 'no existen puertos registrados'})
      : getData(res, data, 200)

    }catch(err){
        msjError(
          res,
          500,
          { message: 'ah ocurrido un error', error: err.toString() })
   } 
}

// ===================================
// Buscar Puerto por id
// ===================================


const findById = async(req, res)=>{
  const id = req.params.id;
  
  const data =  await Puerto.findById(id);

  try{
    !data 
    ? msjError(res,404,{message: 'no existe el puerto con el id: '.concat(id) })
    : getData(res, data, 200)

    }catch(err){
        msjError(
          res,
          500,
          { message: 'ah ocurrido un error', error: err.toString() })
   } 
}

// ===================================
// Actualizar un puerto
// ===================================

const update = async (req, res)=>{

   const puerto = new Puerto({ ...req.body })

   console.log("body:", puerto);
  
  try{
    const data = await puerto.updateOne(puerto);

    getData(res, data, 200);

  }catch(error){
    msjError(
          res,
          500,
          {  error: error.toString() })
  }
}

// ===================================
// Elimiar (fisicamente) Puerto por id
// ===================================
const deletePuerto = async (req, res)=>{
  const id = req.params.id;
  console.log("id: ", id)

  try{
    const data =  await Puerto.findByIdAndRemove(id);

    !data 
    ? msjError(res,404,{message: 'no se pudo eliminar el puerto: '.concat(id) })
    : getData(res, data, 200)

    }catch(err){
        msjError(
          res,
          500,
          { error: err.toString() })
   }
}

msjError = (res, cod, message ) =>{
  return res.status(cod).json({
        message,
      });
}

getData = (res, data, cod)=>{
  return res.status(cod).json({
      data
    });
}

module.exports = {
  save,
  find,
  findById,
  deletePuerto,
  update,
}