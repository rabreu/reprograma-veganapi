const tipoCollection = require("../models/tipoSchema");

class ProdutoDTO {
    constructor(produto) {
        this._id = produto._id;
        this.nome = produto.nome;
        this.sabor = produto.sabor;
        this.tipo = produto.tipo;
        this.fabricante = produto.fabricante;
        this.vegan = produto.vegan;
        this.ingredientesorigemanimal = produto.ingredientesorigemanimal;
        this.imagem_url = produto.imagem_url;
        this.observacao = produto.observacao;
        this.datacriacao = produto.createdAt;
        this.dataultimaatualizacao = produto.updatedAt;
    }

    getReferences = () => {
        return new Promise(async (resolve, reject) => {
            await tipoCollection.findById(this.tipo, (err, tipo) => {
                if (err)
                    reject(err);
                else if (tipo)
                    this.tipo = tipo.nome;
            })
            resolve(this)
        })
    }
}

module.exports = ProdutoDTO;