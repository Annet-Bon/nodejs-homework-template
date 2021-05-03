const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(logger('dev'))


app.use('/weather', require('./routes/api/weather'))

//404 error
app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

//500 error (всегда 4 параметра должно быть у обработчика ошибок)
app.use((err, req, res, next) => {
  if (!res.headersSent) {
      res.status(500).json({ message: err.message })
  }
})

module.exports = app