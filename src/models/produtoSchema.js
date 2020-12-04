const mongoose = require("mongoose")
const Schema = mongoose.Schema

const produtoSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        unique: true,
        auto: true,
        required: true
    },
    nome: {
        type: String,
        required: "Este campo é obrigatório."

    },
    sabor: {
        type: String,
        required: false
    },
    fabricante: {
        type: String,
        required: "Este campo é obrigatório."
    },
    vegan: {
        type: Boolean,
        required: "Este campo é obrigatório."
    },
    ingredientesorigemanimal: [{
        type: String,
        required: false
    }], 
    imagem_url: {
        type: String,
        required: false
    },
    dataultimaconsulta: {
        type: String,
        required: "Este campo é obrigatório."
    },
    observacao: {
        type: String,
        required: false
    }
})

const produtoCollection = mongoose.model('produtos', produtoSchema)

module.exports = produtoCollection