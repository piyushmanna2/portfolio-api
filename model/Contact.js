const mongoose = require('mongoose');

const Contact = mongoose.Schema({
    icon: String,
    name: String
})

const contactModel = mongoose.model('Contact', Contact);
module.exports = contactModel;