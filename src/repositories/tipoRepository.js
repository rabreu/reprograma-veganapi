const tipoCollection = require('../models/tipoSchema')

const getIdByNome = (nome) => {
    return new Promise((resolve) => {
        tipoCollection.findOne({ nome: nome }, (err, tipo) => {
            if (err)
                reject(new ErrorMessage(500, err));
            if (tipo)
                resolve(tipo._id);
            resolve(null);
        })
    })
}

module.exports = {
    getIdByNome
}