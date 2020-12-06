const controller = require("../controllers/tipoController")
const express = require('express')
const router = express.Router()

router.get('/tipos', controller.getAll);
router.post('/tipos', controller.addTipo);
router.patch('/tipos/:id', controller.updateTipo);
router.delete('/tipos/:id', controller.deleteTipo);

module.exports = router