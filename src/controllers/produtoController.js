const produtoCollection = require("../models/produtoSchema")

const getProdutos = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    const query = req.query;
    produtoCollection.find(query, (err, produtos) => {
        if(err)
            return res.status(400).send(err);
        if(produtos.length < 1)
            return res.status(404).send({ mensagem: "Não foram encontrados produtos com estes critérios. :("});
        return res.status(200).send(produtos);
    })
}

const getProdutoById = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    const { id } = req.params
    produtoCollection.findById(id, (err, produto) => {
        if(err)
            return res.status(500).send(err);
        if(!produto)
            return res.status(404).send({ mensagem: "Produto não encontrado. :("});
        return res.status(200).send(produto)
    })
}

const addProduto = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    const produtoBody = req.body;
    const saveProduto = new produtoCollection(produtoBody);
    saveProduto.save((err) => {
        if(err)
            return res.status(400).send(err);
        return res.status(201).send(saveProduto);
    })
}

const editProduto = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    const id = req.params.id
    const produtoBody = req.body;
    produtoCollection.findByIdAndUpdate(id, produtoBody, { new: true }, (err, produto) => {
        if(err)
            return res.status(500).send(err);
        if(!produto)
            return res.status(404).send({ mensagem: "Produto não encontrado. :("});
        return res.status(200).send(produto);
    })
}

const deleteProduto = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    const id = req.params.id
    produtoCollection.findByIdAndDelete(id, (err, produto) => {
        if(err)
            return res.status(400).send(err);
        if(!produto)
            return res.status(404).send({ mensagem: "Produto não encontrado. :("});
        return res.status(200).send({ mensagem: "Produto apagado."});
    })
}

module.exports = {
    getProdutos,
    getProdutoById,
    addProduto,
    editProduto,
    deleteProduto
}