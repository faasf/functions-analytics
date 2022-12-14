const express = require('express');

const {getLogs} = require('../controllers/logs');

const router = express.Router();

router.get('', getLogs);

module.exports = router;