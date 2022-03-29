const connectToMongo = require('./db')
var express = require('express')
var cors = require('cors')
connectToMongo();



const app = express()
app.use(cors())
const port = 5000

// Middleware to use req.body
app.use(express.json())
// Available Routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))



app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})