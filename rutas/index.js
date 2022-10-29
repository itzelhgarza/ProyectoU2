//En este arhivo estarán todos los llamados (casos de uso)
const express = require('express');
const rutas = express.Router();

//importar modelo de la BD
const Estud = require('../modelos/estudiante');

//endpoint default
rutas.get('/',async(req,res)=>{
    //res.send("Hola, desde la ruta GET/");
    const listaEstudiantes = await Estud.find();
    console.log(listaEstudiantes);
    res.render("hola",{listaEstudiantes});
});

//insertar estudiante
rutas.post('/estudiantes',async(req,res)=>{
    var e = new Estud(req.body);
    await Estud.insertMany(e)
    res.redirect('/');
    
});

//delete ****temporal****
// rutas.get('/estudiantes/:id',(req,res)=>{

// });

module.exports=rutas;