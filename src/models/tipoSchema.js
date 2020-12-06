const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tipoSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        unique: true,
        auto: true,
        required: true
    },
    nome: {
        type: String,
        required: "Este campo é obrigatório."

    }
})

const tipoCollection = mongoose.model('tipos', tipoSchema)

module.exports = tipoCollection