const produtoCollection = require("../models/produtoSchema")
const tipoCollection = require("../models/tipoSchema")
const ErrorMessage = require("../helpers/ErrorMessage")
const ProdutoDTO = require("../DTO/ProdutoDTO")
const API_PATH = process.env.API_PATH
const dotenv = require('dotenv')
const Message = require("../helpers/Message")
const fabricanteCollection = require("../models/fabricanteSchema")

dotenv.config()

const getProdutos = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const query = req.query;
    if (query.hasOwnProperty("tipo")) {
        query.tipo = await new Promise((resolve) => {
            tipoCollection.findOne({ nome: query.tipo }, (err, tipo) => {
                if (err)
                    return res.status(500).send(new ErrorMessage(500, err));
                if (tipo)
                    resolve(tipo._id);
                resolve(null);
            })
        })
    }
    if (query.hasOwnProperty("fabricante")) {
        query.fabricante = await new Promise((resolve) => {
            fabricanteCollection.findOne({ nome: query.fabricante }, (err, fabricante) => {
                if (err)
                    return res.status(500).send(new ErrorMessage(500, err));
                if (fabricante)
                    resolve(fabricante._id);
                resolve(null);
            })
        })
    }
    if (query.hasOwnProperty("preco_min") || query.hasOwnProperty("preco_max")) {
        let priceFilter = {};
        if (query.hasOwnProperty("preco_min")) {
            priceFilter["$gte"] = query.preco_min;
            delete query["preco_min"];
        }
        if (query.hasOwnProperty("preco_max")) {
            priceFilter["$lte"] = query.preco_max;
            delete query["preco_max"];
        }
        query["media_preco"] = priceFilter;
    }
    produtoCollection.find(query, (err, produtos) => {
        if (err)
            res.status(500).send(new ErrorMessage(500, err));
        if (produtos.length < 1)
            return res.status(200).send(new Message("Não foram encontrados produtos com estes critérios. :("));
        Promise.all(produtos.map(produto => {
            return new Promise((resolve, reject) => {
                produto
                    .populate('tipo')
                    .populate('fabricante')
                    .execPopulate()
                    .then(produto => {
                        resolve(new ProdutoDTO(produto));
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        }))
            .then(produtos => {
                return res.status(200).send(produtos);
            })
            .catch(err => {
                return res.status(500).send(new ErrorMessage(500, err));
            })
    })
}

const getProdutoById = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const { id } = req.params
    produtoCollection.findById(id)
        .populate('tipo')
        .populate('fabricante')
        .then(produto => {
            if (!produto)
                return res.status(200).send(new ErrorMessage("Produto não encontrado. :("));
            return res.status(200).send(new ProdutoDTO(produto));
        })
        .catch(err => {
            return res.status(500).send(new ErrorMessage(500, err));
        })
}

const addProduto = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const produtoBody = req.body;
    const saveProduto = new produtoCollection(produtoBody);
    saveProduto.save((err, produto) => {
        if (err)
            return res.status(500).send(new ErrorMessage(500, err));
        produto
            .populate('tipo')
            .populate('fabricante')
            .execPopulate()
            .then(produto => {
                return res.status(201).send(new ProdutoDTO(produto));
            })
            .catch(err => {
                return res.status(500).send(new ErrorMessage(500, err));
            })
    })
}

const addProdutos = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const produtos = req.body;
    Promise.all(produtos.map((produto) => {
        return new Promise((resolve, reject) => {
            produtoCollection.create(produto)
                .then((produtoAdicionado) => {
                    produtoAdicionado
                        .populate('tipo')
                        .populate('fabricante')
                        .execPopulate()
                        .then(produto => {
                            resolve(new ProdutoDTO(produto));
                        })
                        .catch(err => {
                            reject(err);
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
            return res.status(500).send(new ErrorMessage(500, err));
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
            return res.status(200).send(new Message("Produto não encontrado. :("));
        produto
            .populate('tipo')
            .populate('fabricante')
            .execPopulate()
            .then(produto => {
                return res.status(200).send(new ProdutoDTO(produto));
            })
            .catch(err => {
                return res.status(500).send(new ErrorMessage(500, err));
            })
    })
}

const deleteProduto = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id;
    produtoCollection.findByIdAndDelete(id, (err, produto) => {
        if (err)
            return res.status(500).send(new ErrorMessage(500, err));
        if (!produto)
            return res.status(200).send(new Message("Produto não encontrado. :("));
        return res.status(200).send(new Message("Produto apagado."));
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