require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const app = express()
const port = process.env.PORT || 3333

const catRoute = require('./src/routes/category')
const productRoute = require('./src/routes/product')
const kasirRoute = require('./src/routes/kasir')
const transRoute = require('./src/routes/transaksi')
const whitelist = process.env.WHITELIST

const corsOptions = (req, callback) => {
  if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
    console.log('Success')
    return callback(null, {
      origin: true
    })
  } else {
    console.log('Failed')
    return callback(membernull, {
      origin:false
    })
  }
} 

app.use(cors());
app.options('*', cors(corsOptions))
app.use(xssFilter())
app.use(logger('dev'))

app.listen(port, () => {
  console.log(`\n App ini berjalan di port/ App listening on port ${port} \n `)
})

app.use(bodyParser.json()) // Body parse json
app.use(bodyParser.urlencoded({ extended: false })) // body type
app.use(`/cat`, catRoute)
app.use(`/product`, productRoute)
app.use(`/kasir`, kasirRoute)
app.use(`/trans`, transRoute)
