var router = require('express').Router();

router.use('/diary', require('./FoodItem'));
router.use('/activity', require('./Activity'));

module.exports = router;