const aboutModel = require('../model/About');
const redisClient = require('../config/redis');

const CACHE_KEY = 'about_data';
const CACHE_TTL = 3600;

const getAbout = async (req, res) => {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      return res.status(200).json({ status: true, data: JSON.parse(cachedData) });
    }

    const about = await aboutModel.find();
    if (about.length > 0) {
      await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(about));
      res.status(200).json({ status: true, data: about });
    } else {
      res.status(404).json({ status: false, msg: "No about found." });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "Error getting about" });
  }
}

module.exports = { getAbout };