const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tipoSchema = new Schema({
    nome: {
        type: String,
        required: "Este campo é obrigatório.",
        unique: true
    }
})

const tipoCollection = mongoose.model('tipos', tipoSchema)

module.exports = tipoCollection