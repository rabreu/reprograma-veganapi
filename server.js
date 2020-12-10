const app = require('./src/app')
const PORT = process.env.PORT || 8080
const API_PATH = process.env.API_PATH
const dotenv = require('dotenv')

dotenv.config()

app.listen(PORT, () => {
    console.log(`VeganAPI server running on http://localhost:${PORT}${API_PATH}.`)
})