const mongoose = require('mongoose');

const TechStack = mongoose.Schema({
    tech: String,
    progress: Number
})

const techStackModel = mongoose.model('TechStack',TechStack);
module.exports = techStackModel;