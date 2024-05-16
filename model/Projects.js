const mongoose = require('mongoose');

const Project = mongoose.Schema({
    project_name: String,
    project_techstack: String,
    project_image: String,
    project_code: String,
    project_status: String
})

const projectModel = mongoose.model('Project', Project);
module.exports = projectModel;