const express = require('express')
const router = express.Router()

const { loginUser, signupUser } = require('../controllers/authController')

// login route
router.get('/login', loginUser)

// signup route
router.get('/signup', signupUser)

module.exports = router