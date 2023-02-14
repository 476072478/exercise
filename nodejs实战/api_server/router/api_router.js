const express = require('express')
const handle = require('../routerhandle/api_router')
const router = express.Router()
const { regUser, login } = handle
router.post('/login', login)
router.post('/register', regUser)
module.exports = router