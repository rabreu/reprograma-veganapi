const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fabricanteSchema = new Schema({
    nome: {
        type: String,
        required: "Este campo é obrigatório",
        unique: true
    },
    observacao: {
        type: String,
        required: false,
    }
})

const fabricanteCollection = mongoose.model('fabricantes', fabricanteSchema);

module.exports = fabricanteCollection