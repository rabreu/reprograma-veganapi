class Produto {
    constructor(nome, sabor, tipo, fabricante, vegan, ingredientesorigemanimal, imagem_url, observacao) {
        this.nome = nome;
        this.sabor = sabor;
        this.tipo = tipo;
        this.fabricante = fabricante;
        this.vegan = vegan;
        this.ingredientesorigemanimal = ingredientesorigemanimal;
        this.imagem_url = imagem_url;
        this.observacao = observacao;
    }
}

module.exports = Produto