const contactModel = require('../model/Contact');

const getContact = async (req, res) => {
    try {
        const contact = await contactModel.find();
        if(contact.length > 0) {
            res.status(200).json({status: true, data: contact});
        }else{
            res.status(404).json({status: false , msg: "No Contact found."});
        }
    } catch (error) {
        res.status(201).json({status: false , msg: "Error Contact techstack"});
    }
}

module.exports = { getContact }
