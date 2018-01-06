const router = require('express').Router()

router.use('/', require('./home.js'))
router.use('/chat', require('./chat.js'))
router.use('/Contato', require('./contact.js'))
router.use('/chatForm', require('./formChat.js'))
router.use('/Portfolio', require('./portfolio.js'))

module.exports = router
