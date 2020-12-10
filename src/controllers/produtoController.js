const produtoCollection = require("../models/produtoSchema")
const tipoCollection = require("../models/tipoSchema")
const ErrorMessage = require("../helpers/ErrorMessage")
const ProdutoDTO = require("../DTO/ProdutoDTO")
const API_PATH = process.env.API_PATH
const dotenv = require('dotenv')

dotenv.config()

const getProdutos = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const query = req.query;
    if (query.hasOwnProperty("tipo")) {
        query.tipo = await new Promise((resolve) => {
            tipoCollection.findOne({ nome: query.tipo }, (err, tipo) => {
                if (err)
                    return res.send(500).send(err);
                if (tipo)
                    resolve(tipo._id);
                resolve(null);
            })
        })
    }
    produtoCollection.find(query, (err, produtos) => {
        if (err)
            return res.status(400).send(err);
        if (produtos.length < 1)
            return res.status(404).send(new ErrorMessage("Não foram encontrados produtos com estes critérios. :("));
        Promise.all(produtos.map(produto => {
            return new Promise((resolve, reject) => {
                produto.populate('tipo', (err, produto) => {
                    if (err)
                        reject(err);
                    else 
                        resolve(new ProdutoDTO(produto));              
                })
            })
        }))
            .then(produtos => {
                return res.status(200).send(produtos);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    })
}

const getProdutoById = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const { id } = req.params
    produtoCollection.findById(id).populate('tipo')
        .then(produto => {
            if (!produto)
                return res.status(404).send(new ErrorMessage("Produto não encontrado. :("));
            return res.status(200).send(new ProdutoDTO(produto));
        })
        .catch(err => {
            return res.status(500).send(err);
        })
}

const addProduto = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const produtoBody = req.body;
    const saveProduto = new produtoCollection(produtoBody);
    saveProduto.save((err, produto) => {
        if (err)
            return res.status(500).send(err);
        produto.populate('tipo', (err, produto) => {
            if (err)
                return res.status(500).send(err);
            return res.status(201).send(new ProdutoDTO(produto));
        });
    })
}

const addProdutos = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const produtos = req.body;
    Promise.all(produtos.map((produto) => {
        return new Promise((resolve, reject) => {
            produtoCollection.create(produto)
                .then((produtoAdicionado) => {
                    produtoAdicionado.populate('tipo', (err, produto) => {
                        if (err)
                            reject(err);
                        else
                            resolve(new ProdutoDTO(produto));
                    })
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }))
        .then((produtosAdicionados) => {
            return res.status(201).send(produtosAdicionados);
        })
        .catch((err) => {
            return res.status(500).send(err);
        })
}

const updateProduto = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id
    const produtoBody = req.body;
    produtoCollection.findByIdAndUpdate(id, produtoBody, { new: true, useFindAndModify: false }, (err, produto) => {
        if (err)
            return res.status(500).send(err);
        if (!produto)
            return res.status(404).send(new ErrorMessage("Produto não encontrado. :("));
        produto.populate('tipo', (err, produto) => {
            if (err)
                return res.status(500).send(err);
            return res.status(200).send(new ProdutoDTO(produto));
        })
    })
}

const deleteProduto = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id;
    produtoCollection.findByIdAndDelete(id, (err, produto) => {
        if (err)
            return res.status(400).send(err);
        if (!produto)
            return res.status(404).send(new ErrorMessage("Produto não encontrado. :("));
        return res.status(200).send(new ErrorMessage("Produto apagado."));
    })
}

module.exports = {
    getProdutos,
    getProdutoById,
    addProduto,
    addProdutos,
    updateProduto,
    deleteProduto
}