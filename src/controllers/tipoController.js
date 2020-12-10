const tipoCollection = require("../models/tipoSchema")
const dotenv = require('dotenv')
const Message = require("../helpers/Message")
dotenv.config()
const API_PATH = process.env.API_PATH

const getAll = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    tipoCollection.find((err, tipos) => {
        if (err)
            return res.status(500).send(new ErrorMessage(500, err));
        if (tipos.length < 1)
            return res.status(200).send(new Message("Não há tipos cadastrados."));
        return res.status(200).send(tipos);
    })
}

const addTipo = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const tipoBody = req.body;
    const tipo = await tipoCollection.create(tipoBody);
    return res.status(201).send(tipo);
}

const updateTipo = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id
    const tipoBody = req.body;
    tipoCollection.findByIdAndUpdate(id, tipoBody, { new: true }, (err, tipo) => {
        if (err)
            return res.status(500).send(new ErrorMessage(500, err));
        return res.status(200).send(tipo);
    })
}

const deleteTipo = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id;
    tipoCollection.findByIdAndDelete(id, (err, tipo) => {
        if (err)
            return res.status(500).send(new ErrorMessage(500, err));
        if (!tipo)
            return res.status(200).send(new Message("Tipo não localizado."));
        return res.status(200).send(new Message("Tipo apagado."));
    })
}

module.exports = {
    getAll,
    addTipo,
    updateTipo,
    deleteTipo
}