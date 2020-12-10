const fabricanteCollection = require("../models/fabricanteSchema")
const ErrorMessage = require("../helpers/ErrorMessage")
const dotenv = require('dotenv')
const Message = require("../helpers/Message")
dotenv.config()
const API_PATH = process.env.API_PATH

const getAll = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    fabricanteCollection.find((err, fabricantes) => {
        if (err)
            return res.status(500).send(new ErrorMessage(500, err));
        if (fabricantes.length < 1)
            return res.status(200).send(new Message("Não há fabricantes cadastrados."));
        return res.status(200).send(fabricantes);
    })
}

const getById = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id;
    fabricanteCollection.findById(id, (err, fabricante) => {
        if(err)
            return res.status(500).send(new ErrorMessage(500, err));
        if(!fabricante)
            return res.status(200).send(new Message("Fabricante não localizado."));
        return res.status(200).send(fabricante);
    })
}

const addFabricante = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const fabricanteBody = req.body;
    fabricanteCollection.create(fabricanteBody)
        .then(fabricante => {
            return res.status(201).send(fabricante);
        })
        .catch(err => {
            return res.status(500).send(new ErrorMessage(500, err));
        })
}

const updateFabricante = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id
    const fabricanteBody = req.body;
    fabricanteCollection.findByIdAndUpdate(id, fabricanteBody, { new: true }, (err, fabricante) => {
        if (err)
            return res.status(500).send(new ErrorMessage(500, err));
        return res.status(200).send(fabricante);
    })
}

const deleteFabricante = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id;
    fabricanteCollection.findByIdAndDelete(id, (err, fabricante) => {
        if (err)
            return res.status(500).send(new ErrorMessage(500, err));
        if (!fabricante)
            return res.status(200).send(new Message("Fabricante não localizado."));
        return res.status(200).send(new Message("Fabricante apagado."));
    })
}

module.exports = {
    getAll,
    getById,
    addFabricante,
    updateFabricante,
    deleteFabricante
}