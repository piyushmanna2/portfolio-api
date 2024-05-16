const express = require('express');
const router = express.Router();
const { getAbout } = require('../controller/about-controller');

router.get('/about', getAbout);

module.exports = router;