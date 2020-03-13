const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

const PORT = config.get('port') || 5000

async function start() {
    try {
        // Разобраться с опциями
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log('app has been started on port ' + PORT)
        })
    } catch (error) {
        console.log("Server Error", error.message)
        process.exit(1)
    }
}

start()