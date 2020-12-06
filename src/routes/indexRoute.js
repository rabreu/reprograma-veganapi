const express = require('express')
const router = express.Router()
const { API_PATH } = require('../conf')

router.get('/', (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`);
    return res.status(200).send("Bem vinde ao VeganAPI 1.0.");
})

module.exports = router