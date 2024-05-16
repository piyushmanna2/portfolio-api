const mongoose = require('mongoose');

const About = mongoose.Schema({
    about: String
})

const aboutModel = mongoose.model('About',About);
module.exports = aboutModel;