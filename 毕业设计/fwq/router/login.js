const express = require('express')
const handle = require('../routerhandle/login')
const router = express.Router()
const { regUser, login, logins, adminlogin } = handle
router.post('/register', regUser)
router.post('/login', login)
router.post('/logins', logins)
router.post('/adminlogin', adminlogin)
module.exports = router