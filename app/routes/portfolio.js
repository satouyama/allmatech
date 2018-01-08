const router = require('express').Router()

router.route('/')

.get((req, res) => {
	res.render('Portfolio')
})

module.exports = router
