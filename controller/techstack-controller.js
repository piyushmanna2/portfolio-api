const techstackModel = require('../model/TechStack');
const redisClient = require('../config/redis');

const CACHE_KEY = 'techstack_data';
const CACHE_TTL = 3600;

const getTechStack = async (req, res) => {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      return res.status(200).json({ status: true, data: JSON.parse(cachedData) });
    }

    const techstack = await techstackModel.find();
    if (techstack.length > 0) {
      await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(techstack));
      res.status(200).json({ status: true, data: techstack });
    } else {
      res.status(404).json({ status: false, msg: "No techstack found." });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "Error getting techstack" });
  }
}

module.exports = { getTechStack };