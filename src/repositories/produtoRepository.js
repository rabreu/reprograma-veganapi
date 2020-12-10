const { resolve } = require('path');
const produtoCollection = require('../models/produtoSchema')

const getProdutoById = (id) => {
    return new Promise((resolve, reject) => {
        produtoCollection.findById(id)
            .populate('tipo')
            .populate('fabricante')
            .then(produto => {
                resolve(produto);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getProdutosByQuery = (query) => {
    return new Promise((resolve, reject) => {
        produtoCollection.find(query, (err, produtos) => {
            if (err)
                reject(err);
            resolve(produtos);
        })
    })
}

const addProduto = (produtoBody) => {
    return new Promise((resolve, reject) => {
        new produtoCollection(produtoBody)
            .save((err, produto) => {
                if (err)
                    reject(err);
                produto
                    .populate('tipo')
                    .populate('fabricante')
                    .execPopulate()
                    .then(produto => {
                        resolve(produto);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
    })
}

const updateProduto = (id, produtoBody) => {
    return new Promise((resolve, reject) => {
        produtoCollection.findByIdAndUpdate(id, produtoBody, { new: true, useFindAndModify: false }, (err, produto) => {
            if (err)
                reject(err)
            if (!produto)
                resolve(null)
            else
                produto
                    .populate('tipo')
                    .populate('fabricante')
                    .execPopulate()
                    .then(produto => {
                        resolve(produto);
                    })
                    .catch(err => {
                        reject(err);
                    })
        })
    })
}

const deleteProduto = (id) => {
    return new Promise((resolve, reject) => {
        produtoCollection.findByIdAndDelete(id, (err, produto) => {
            if (err)
                reject(err);
            resolve(produto);
        })
    })
}

module.exports = {
    getProdutoById,
    getProdutosByQuery,
    addProduto,
    updateProduto,
    deleteProduto
}