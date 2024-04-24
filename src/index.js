const cors = require('cors')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 8008

app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to Landale Connect!')
})

/**
 * This route reads from our local Kaizo attempts file and spits 
 * out the number of attempts.
 */
app.get('/stats/kaizo', (req, res) => {
  const file = '/mnt/e/BizHawk/Lua/IronMon/FRLG Kaizo Attempts.txt'

  try {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) throw err
      return res.status(200).json({ attempts: data })
    })
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
})

/**
 * This route reads from our local Kaizo CSV file and spits 
 * out... the CSV.
 */
app.get('/stats/kaizo/csv', (req, res) => {
  const file = '/mnt/e/BizHawk/Lua/IronMon/extensions/SimplyTracked/simply-tracked.csv'

  try {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) throw err
      return res.status(200).type('text/csv').send(file)
    })
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
})

app.listen(port, () => {
  console.log(`Connect is listening on port ${port}.`)
})
 