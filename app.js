const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
//conexión a bd
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crud-proyecto').
then(db=>console.log("Conectado a la BD")).
catch(err=>console.log("Error al conectarse en la BD"));

//configurar vistas
app.set('views',__dirname+'/Vistas');
app.set('view engine', 'ejs');

//configurar rutas, para eso nos traemos el paquete 1.
const indiceRutas = require('./rutas/index');
//2. Ahora tenemos que decirle a esta madre que va a usar las rutas
app.use('/',indiceRutas);

app.listen(3000, ()=>{
    console.log("Servidor en puerto 3000");
});