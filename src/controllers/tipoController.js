const tipoCollection = require("../models/tipoSchema")

const getAll = (req, res) => {
    tipoCollection.find((err, tipos) => {
        if(err)
            res.status(500).send(err);
        if(tipos.length < 1)
            res.status(404).send("Não há tipos cadastrados.");
        res.status(200).send(tipos);
    })
}

const addTipo = async (req, res) => {
    const tipoBody = req.body;
    const tipo = await tipoCollection.create(tipoBody);
    return res.status(201).send(tipo);
}

const updateTipo = (req, res) => {
    const id = req.params.id
    const tipoBody = req.body;
    tipoCollection.findByIdAndUpdate(id, tipoBody, { new: true }, (err, tipo) => {
        if(err)
            return res.status(500).send(err);
        return res.status(200).send(tipo);
    })
}

const deleteTipo = (req, res) => {
    const id = req.params.id;
    tipoCollection.findByIdAndDelete(id, (err, tipo) => {
        if(err)
            return res.status(500).send(err);
        return res.status(200).send("Tipo apagado.");
    })
}

module.exports = {
    getAll,
    addTipo,
    updateTipo,
    deleteTipo
}