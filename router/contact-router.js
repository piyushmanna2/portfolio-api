const express = require('express');
const router = express.Router();
const { getContact } = require('../controller/contact-controller');

router.get('/contact', getContact);

module.exports = router;
