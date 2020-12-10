const fabricanteCollection = require('../models/fabricanteSchema')

const getIdByNome = (nome) => {
    return new Promise((resolve, reject) => {
        fabricanteCollection.findOne({ nome: nome }, (err, fabricante) => {
            if (err)
                reject(err);
            if (fabricante)
                resolve(fabricante._id);
            resolve(null);
        })
    })
}

module.exports = {
    getIdByNome
}