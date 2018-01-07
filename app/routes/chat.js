const router = require('express').Router()

router.route('/')

.post((req ,res) => {
	res.render("chat", {dadosForm: req.body})
})

module.exports = router
