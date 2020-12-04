const app = require('./src/app')
const { PORT } = require('./src/conf')

app.listen(PORT, () => {
    console.log(`VeganAPI server running on http://localhost:${PORT}.`)
})