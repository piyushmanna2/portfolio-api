const projectModel = require('../model/Projects');

const getProjects = async (req, res) => {
    try {
        const project = await projectModel.find({project_status:"public"});
        if(project.length > 0) {
            res.status(200).json({status: true, data: project});
        }else{
            res.status(200).json({status: false , msg: "No project found."});
        }
    } catch (error) {
        res.status(201).json({status: false , msg: "Error getting projects"});
    }
}

module.exports = { getProjects }