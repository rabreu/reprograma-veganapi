const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const API_PATH = process.env.API_PATH

router.get('/', (req, res) => {
    console.log(`${req.method} ${API_PATH}${req.url}`);
    return res.status(200).send("Bem vinde ao VeganAPI 1.0.");
})

module.exports = router