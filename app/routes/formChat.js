const router = require('express').Router()

router.route('/')

.get((req, res) => {
	res.render('formChat')
})

module.exports = router
