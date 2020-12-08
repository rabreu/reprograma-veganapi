const express = require('express')
const router = express.Router()
const controller = require('../controllers/produtoController')

router.get('/produtos', controller.getProdutos);
router.get('/produtos/:id', controller.getProdutoById);
router.post('/produtos', controller.addProduto);
router.post('/produtos/lista', controller.addProdutos);
router.patch('/produtos/:id', controller.updateProduto);
router.delete('/produtos/:id', controller.deleteProduto);

module.exports = router