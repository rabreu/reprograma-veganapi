const express = require('express')
const app = express()
const cors = require('cors')
const { API_PATH } = require('./conf')

const db = require("./models/repository")
db.connect()

const produtoRoutes = require("./routes/produtoRoutes")
const tipoRoutes = require("./routes/tipoRoutes")

app.use(cors())
app.use(express.json())
app.use(API_PATH, produtoRoutes)
app.use(API_PATH, tipoRoutes)

module.exports = app