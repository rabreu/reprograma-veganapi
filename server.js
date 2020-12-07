const app = require('./src/app')
const dotenv = require('dotenv')
dotenv.config()
const HOST = process.env.HOST
const PORT = process.env.PORT
const API_PATH = process.env.API_PATH

app.listen(PORT, HOST, () => {
    console.log(`VeganAPI server running on http://${HOST}:${PORT}${API_PATH}.`)
})