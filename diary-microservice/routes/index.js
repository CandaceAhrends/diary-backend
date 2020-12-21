var router = require('express').Router();

router.use('/diary', require('./FoodItem'));

module.exports = router;