const projectModel = require('../model/Projects');
const redisClient = require('../config/redis');

const CACHE_KEY = 'projects_data';
const CACHE_TTL = 3600;

const getProjects = async (req, res) => {
  try {

    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      return res.status(200).json({ status: true, data: JSON.parse(cachedData) });
    }

    const project = await projectModel.find({ project_status: "public" });

    await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(project));
    
    if (project.length > 0) {
      res.status(200).json({ status: true, data: project });
    } else {
      res.status(200).json({ status: false, msg: "No project found." });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "Error getting projects" });
  }
}

module.exports = { getProjects };