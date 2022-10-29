const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const esquema = mongoose.Schema;

//Declaración del objeto
const estEsquema = new esquema({
    id: String,
    nombre: String,
    aprobado: {
        type: Boolean,
        default: false
    }
});
//            nombre de la colección en la BD, esquema que creamos en ese script
module.exports = mongoose.model('estudiantes', estEsquema);