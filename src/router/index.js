const express = require('express');

const logsRouter = require('./logs');

const router = express.Router();

router.use('/v1/logs', logsRouter);

module.exports = router;