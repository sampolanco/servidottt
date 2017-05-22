var express = require('express'),
	router = express.Router();

router.get('/', function(req, res,next) {
	res.render('manual');
})
router.get('/web/', function(req, res,next) {
	res.render('manualweb');
})

router.get('/escritorio/', function(req, res,next) {
	res.render('manualescritorio');
})


module.exports = router;
