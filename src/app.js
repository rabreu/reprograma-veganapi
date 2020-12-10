const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const API_PATH = process.env.API_PATH


const db = require("./confs/database")
db.connect()

const indexRoute = require("./routes/indexRoute")
const produtoRoutes = require("./routes/produtoRoutes")
const tipoRoutes = require("./routes/tipoRoutes")
const fabricanteRoutes = require("./routes/fabricanteRoutes")

app.use(cors())
app.use(express.json())
app.use(API_PATH, indexRoute)
app.use(API_PATH, produtoRoutes)
app.use(API_PATH, tipoRoutes)
app.use(API_PATH, fabricanteRoutes)
app.use("/", (req, res) => {
    res.status(302).redirect(API_PATH);
})

module.exports = app