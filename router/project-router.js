const express = require('express');
const router = express.Router();
const { getProjects } = require('../controller/project-controller');

router.get('/projects', getProjects);

module.exports = router;