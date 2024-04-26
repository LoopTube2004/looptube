require('dotenv').config()
const authRoutes = require('./routes/auth')
const cors = require('cors');

const express = require('express')
//require database

const app = express()

// middleware
app.use(express.json())
app.use(cors());  // This will allow all CORS requests

app.use('/api/auth', authRoutes)

app.listen(4000, () => {
    console.log('connected to db & listening on port', 4000)
})