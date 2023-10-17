let config = require('./config/setting');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const fs = require('fs')
const path = require('path')

const connectMongo = require('./config/connectMongo');
const { log } = require('console');

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cors())

connectMongo();
console.log(111111111111111);
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

// const nums = [-5, 1, -3, 3, -1, 2, 1, -6, 4];
// let maxSum = 0
// let sumCompare = 0
// let temp = 0
// for (let i = 0; i < nums.length; i++) {
//     for (let x = 0; x < 4; x++) {
//         temp += nums[x + i];
//     }
//     sumCompare = temp
//     if (sumCompare > maxSum) {
//         maxSum = sumCompare;
//     }
//     temp = 0
// }

// console.log(maxSum);
