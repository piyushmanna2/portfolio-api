const express = require('express');
const router = express.Router();
const { getTechStack } = require('../controller/techstack-controller');

router.get('/techstack', getTechStack);

module.exports = router;