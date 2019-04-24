const express = require('express');
const router = express.Router();

router.use('/api', require('./api/user'))
router.use('/api', require('./api/info'))
router.use('/api', require('./api/event'))

module.exports = router;
