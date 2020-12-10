const ErrorMessage = require("../helpers/ErrorMessage")
const ProdutoDTO = require("../DTO/ProdutoDTO")
const API_PATH = process.env.API_PATH
const dotenv = require('dotenv')
const Message = require("../helpers/Message")
const tipoRepository = require("../repositories/tipoRepository")
const fabricanteRepository = require("../repositories/fabricanteRepository")
const produtoRepository = require("../repositories/produtoRepository")

dotenv.config()

const getProdutos = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const query = req.query;
    if (query.hasOwnProperty("tipo"))
        query.tipo = await tipoRepository.getIdByNome(query.tipo)
            .catch(err => {
                return res.status(500).send(new ErrorMessage(500, err));
            });
    if (query.hasOwnProperty("fabricante"))
        query.fabricante = await fabricanteRepository.getIdByNome(query.fabricante)
            .catch(err => {
                return res.status(500).send(new ErrorMessage(500, err));
            });
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
    produtoRepository.getProdutosByQuery(query)
        .then(produtos => {
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
                .then(produtosDTO => {
                    return res.status(200).send(produtosDTO);
                })
                .catch(err => {
                    return res.status(500).send(new ErrorMessage(500, err));
                })
        })
        .catch(err => {
            return res.status(500).send(new ErrorMessage(500, err));
        })
}

const getProdutoById = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const { id } = req.params
    produtoRepository.getProdutoById(id)
        .then(produto => {
            if (!produto)
                return res.status(200).send(new Message("Produto não encontrado. :("));
            return res.status(200).send(new ProdutoDTO(produto));
        })
        .catch(err => {
            return res.status(500).send(new ErrorMessage(500, err));
        })
}

const addProduto = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const produtoBody = req.body;
    produtoRepository.addProduto(produtoBody)
        .then(produto => {
            return res.status(200).send(new ProdutoDTO(produto));
        })
        .catch(err => {
            return res.status(500).send(new ErrorMessage(500, err));
        })
}

const updateProduto = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id
    const produtoBody = req.body;

    produtoRepository.updateProduto(id, produtoBody)
        .then(produto => {
            if (!produto)
                return res.status(200).send(new Message("Produto não encontrado. :("));
            return res.status(200).send(new ProdutoDTO(produto));
        })
        .catch(err => {
            return res.status(500).send(new ErrorMessage(500, err));
        })
}

const deleteProduto = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id;
    produtoRepository.deleteProduto(id)
        .then(produto => {
            if (!produto)
                return res.status(200).send(new Message("Produto não encontrado. :("));
            return res.status(200).send(new Message("Produto apagado."));
        })
        .catch(err => {
            return res.status(500).send(new ErrorMessage(500, err));
        })
}

module.exports = {
    getProdutos,
    getProdutoById,
    addProduto,
    updateProduto,
    deleteProduto
}