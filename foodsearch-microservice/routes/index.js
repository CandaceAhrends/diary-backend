var router = require('express').Router();

router.use('/fs', require('./SearchFatSecret'));
router.use('/usda', require('./SearchUsda'));

module.exports = router;