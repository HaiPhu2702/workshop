let config = require('./config/setting');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const fs = require('fs')
const path = require('path')

const connectMongo = require('./config/connectMongo')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cors())

connectMongo();

const routePath = path.join(__dirname, 'routes');
fs.readdirSync(routePath).forEach(async (filename) => {
    try {
        let name = filename.split('.')[0]
        let pathFile = './routes/' + filename
        app.use(`/api/${name}`, require(pathFile));
    } catch (error) {
        console.log(error.message);
    }
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(config.server.port, () => {
    console.log("server listening on port " + config.server.port);
})
