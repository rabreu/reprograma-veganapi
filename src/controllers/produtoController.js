const produtoCollection = require("../models/produtoSchema")
const Produto = require('../models/Produto')
const ProdutoDTO = require('../DTO/ProdutoDTO')
const { API_PATH } = require('../conf')
const tipoCollection = require("../models/tipoSchema")


const getProdutos = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const query = req.query;
    if (query.hasOwnProperty("tipo")) {
        query.tipo = await new Promise((resolve) => {
            tipoCollection.findOne({ nome: query.tipo }, (err, tipo) => {
                if (err)
                    return res.send(500).send(err);
                if(!tipo)
                    return res.status(500).send("Este tipo não existe.");
                resolve(tipo._id);
            })
        })
    }
    produtoCollection.find(query, async (err, produtos) => {
        if (err)
            return res.status(400).send(err);
        if (produtos.length < 1)
            return res.status(404).send({ mensagem: "Não foram encontrados produtos com estes critérios. :(" });
        Promise.all(produtos.map(produto => {
            return new Promise((resolve, reject) => {
                new ProdutoDTO(produto).getReferences()
                    .then(produtoDTO => {
                        resolve(produtoDTO);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        }))
            .then(data => {
                return res.status(200).send(data);
            })


    })
}

const getProdutoById = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const { id } = req.params
    produtoCollection.findById(id, (err, produto) => {
        if (err)
            return res.status(500).send(err);
        if (!produto)
            return res.status(404).send({ mensagem: "Produto não encontrado. :(" });
        produtoDTO = new ProdutoDTO(produto);
        produtoDTO.getReferences()
            .then(produto => {
                return res.status(200).send(produto);
            })
    })
}

const addProduto = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const { nome, sabor, tipo, fabricante, vegan, ingredientesorigemanimal, imagem_url, dataultimaconsulta, observacao } = req.body;
    const produto = new Produto(nome, sabor, tipo, fabricante, vegan, ingredientesorigemanimal, imagem_url, dataultimaconsulta, observacao);
    const saveProduto = new produtoCollection(produto);
    saveProduto.save((err) => {
        if (err)
            return res.status(400).send(err);
        new ProdutoDTO(saveProduto).getReferences()
            .then(produto => {
                return res.status(201).send(produto);
            })
    })
}

const addProdutos = async (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const produtos = req.body;
    new Promise((resolve, reject) => {
        let produtosAdicionados = []
        produtos.map(async (produto, index) => {
            const { nome, sabor, tipo, fabricante, vegan, ingredientesorigemanimal, imagem_url, dataultimaconsulta, observacao } = produto;
            const produtoObj = new Produto(nome, sabor, tipo, fabricante, vegan, ingredientesorigemanimal, imagem_url, dataultimaconsulta, observacao);
            await produtoCollection.create(produtoObj)
                .then((produto) => {
                    console.log(index)
                    produtosAdicionados.push(produto)
                    if (index == produtos.length - 1)
                        resolve(produtosAdicionados)
                })
                .catch((err) => {
                    reject(err)
                })

        })
    })
        .then((produtosAdicionados) => {
            return res.status(201).send(produtosAdicionados);
        })
        .catch((err) => {
            return res.status(500).send(err);
        })
}

// const addProduto = async (req, res) => {
//     const produto =  await produtoCollection.create(req.body);
//     return res.json(produto)
// };

const editProduto = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = req.params.id
    const produtoBody = req.body;
    produtoCollection.findByIdAndUpdate(id, produtoBody, { new: true }, (err, produto) => {
        if (err)
            return res.status(500).send(err);
        if (!produto)
            return res.status(404).send({ mensagem: "Produto não encontrado. :(" });
        return res.status(200).send(produto);
    })
}

const deleteProduto = (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`)
    const id = re
    q.params.id
    produtoCollection.findByIdAndDelete(id, (err, produto) => {
        if (err)
            return res.status(400).send(err);
        if (!produto)
            return res.status(404).send({ mensagem: "Produto não encontrado. :(" });
        return res.status(200).send({ mensagem: "Produto apagado." });
    })
}

module.exports = {
    getProdutos,
    getProdutoById,
    addProduto,
    addProdutos,
    editProduto,
    deleteProduto
}