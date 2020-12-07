const app = require('./src/app')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const { API_PATH } = require('./src/conf')


app.listen(PORT, () => {
    console.log(`VeganAPI server running on http://localhost:${PORT}${API_PATH}.`)
})