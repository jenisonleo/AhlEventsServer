const express = require('express');
const router = express.Router();

router.use('/api', require('./api/user'))

module.exports = router;
