const { promises } = require('fs');
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

const addProduto = async (produtoBody) => {
    // return new Promise((resolve, reject) => {
    //     const produto = new produtoCollection(produtoBody)
    //     produto.save((err) => {
    //         if (err)
    //             reject(err);
    //         else
    //             resolve(produto);
    //     })

    return new Promise(async (resolve, reject) => {
        const produto = await produtoCollection.create(produtoBody);
        produto
            .populate('tipo')
            .populate('fabricante')
            .execPopulate()
            .then(produto => {
                resolve(produto)
            })
            .catch(err => {
                reject(err);
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