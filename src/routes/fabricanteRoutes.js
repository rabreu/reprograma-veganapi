const controller = require("../controllers/fabricanteController")
const express = require('express')
const router = express.Router()

router.get('/fabricantes', controller.getAll);
router.post('/fabricantes', controller.addFabricante);
router.patch('/fabricantes/:id', controller.updateFabricante);
router.delete('/fabricantes/:id', controller.deleteFabricante);

module.exports = router