class ProdutoDTO {
    constructor(produto) {
        this._id = produto._id;
        this.nome = produto.nome;
        this.sabor = produto.sabor;
        if(produto.tipo)
            this.tipo = produto.tipo.nome;
        if(produto.fabricante)
            this.fabricante = produto.fabricante.nome;
        this.vegan = produto.vegan;
        this.ingredientesorigemanimal = produto.ingredientesorigemanimal;
        this.imagem_url = produto.imagem_url;
        this.observacao = produto.observacao;
        this.data_criacao = produto.createdAt;
        this.data_ultima_atualizacao = produto.updatedAt;
    }
}

module.exports = ProdutoDTO;