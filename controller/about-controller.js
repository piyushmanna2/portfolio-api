const aboutModel = require('../model/About');

const getAbout = async (req, res) => {
    try {
        const about = await aboutModel.find();
        if(about.length > 0) {
            res.status(200).json({status: true, data: about});
        }else{
            res.status(404).json({status: false , msg: "No about found."});
        }
    } catch (error) {
        res.status(201).json({status: false , msg: "Error getting about"});
    }
}

module.exports = { getAbout }