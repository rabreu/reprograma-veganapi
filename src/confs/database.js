const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dotenv = require('dotenv')
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    const connection = mongoose.connection
    connection.on("error", () => console.log("Couldn't connect to MongoDB."))
    connection.once("open", () => console.log(`Connected to MongoDB on ${connection.host}:${connection.port}.`))
}

module.exports = { connect }