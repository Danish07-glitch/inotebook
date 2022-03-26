const connectToMongo = require('./db')

connectToMongo();

const express = require('express')
const app = express()
const port = 5000

// Middleware to use req.body
app.use(express.json())
// Available Routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})