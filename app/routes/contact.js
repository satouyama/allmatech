const router = require('express').Router()

router.route('/')

.get((req, res) => {
	res.render('Contact')
})

module.exports = router
