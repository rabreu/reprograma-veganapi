const express = require('express')
const app = express()
const cors = require('cors')

const db = require("./models/repository")
db.connect()

const routes = require("./routes/produtoRoutes")

app.use(cors())
app.use(express.json())
app.use('/', routes)

module.exports = app