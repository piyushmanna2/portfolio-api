const techstackModel = require('../model/TechStack');

const getTechStack = async (req, res) => {
    try {
        const techstack = await techstackModel.find();
        if(techstack.length > 0) {
            res.status(200).json({status: true, data: techstack});
        }else{
            res.status(404).json({status: false , msg: "No techstack found."});
        }
    } catch (error) {
        res.status(201).json({status: false , msg: "Error getting techstack"});
    }
}

module.exports = { getTechStack }