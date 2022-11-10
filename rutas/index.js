//En este arhivo estarán todos los llamados (casos de uso)
const express = require('express');
const estudiante = require('../modelos/estudiante');
const rutas = express.Router();

//importar modelo de la BD
const Estud = require('../modelos/estudiante');

//middleware
rutas.use(function (req, res, next) {
    if (req.query._method == 'PUT') {
        req.method = 'PUT';
        req.url = req.path;
    } else if (req.query._method == 'DELETE') {
        req.method = 'DELETE';
        req.url = req.path;
    } else if(req.query._method == 'GET'){
        req.method = 'GET';
        req.url = req.path;
    }
    next();
});


//Aprobado 
rutas.put('/estudiantes/:id', async (req, res, next) => {
    const id = req.params.id;
    const estudiante = Estud.find({id:id});
    let status = estudiante.aprobado;
    console.log("STATUS ------"+status);
    if(status == "false"){
        await Estud.updateOne({ id: id }, { $set: { aprobado: true } });
    }else{
        await Estud.updateOne({ id: id }, { $set: { aprobado: false } });
    }
    res.redirect('/');
});

//endpoint default
rutas.get('/', async (req, res) => {
    //res.send("Hola, desde la ruta GET/");
    const listaEstudiantes = await Estud.find();
    console.log(listaEstudiantes);
    res.render("hola", { listaEstudiantes });
});

//insertar estudiante
rutas.post('/estudiantes', async (req, res) => {
    var e = new Estud(req.body);
    await Estud.insertMany(e)
    res.redirect('/');

});

//borrar estudiante
rutas.delete('/estudiantes/:id', async (req, res) => {
    const id = req.params.id;
    await Estud.deleteOne({ id: id });
    res.redirect('/');
});

//Obtener estudiante
rutas.get('/estudiantes/:id', async (req, res) => {
    const id = req.params.id;
    const listaEstudiantes = await Estud.find({ id: id });
    if (id == "Empty") {
        res.redirect("/");
    } else {
        res.render("hola", { listaEstudiantes });
    }
});

module.exports = rutas;