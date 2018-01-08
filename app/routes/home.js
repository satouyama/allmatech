const router = require('express').Router()

router.route('/')

.get((req, res) => {
	res.render('Index')
})

module.exports = router
