const app = require('./src/app')
const { PORT, API_PATH } = require('./src/conf')

app.listen(PORT, () => {
    console.log(`VeganAPI server running on http://localhost:${PORT}${API_PATH}.`)
})