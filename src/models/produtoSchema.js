const mongoose = require("mongoose")
const Schema = mongoose.Schema

const produtoSchema = new Schema({
    nome: {
        type: String,
        required: "Este campo é obrigatório."

    },
    sabor: {
        type: String,
        required: false
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'tipos',
        required: "Este campo é obrigatório."
    },
    fabricante: {
        type: Schema.Types.ObjectId,
        ref: 'fabricantes',
        required: "Este campo é obrigatório."
    },
    vegan: {
        type: Boolean,
        required: "Este campo é obrigatório."
    },
    ingredientesorigemanimal: {
        type: Array,
        default: null,
        required: false
    },
    media_preco: {
        type: Number,
        default: 0,
        required: false
    },
    imagem_url: {
        type: String,
        required: false
    },
    observacao: {
        type: String,
        required: false
    }
},
{ timestamps: true })

const produtoCollection = mongoose.model('produtos', produtoSchema)

module.exports = produtoCollection