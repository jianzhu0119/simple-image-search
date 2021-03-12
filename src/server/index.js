const express = require('express')
const cors = require('cors')
require('dotenv').config()
const api = require('./route')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use('/api/v1', api)

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
)
