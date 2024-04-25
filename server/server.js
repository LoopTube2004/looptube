require('dotenv').config()
const authRoutes = require('./routes/auth')

const express = require('express')
//require database

const app = express()

// middleware
app.use(express.json())


app.use('/api/auth', userRoutes)