const contactModel = require('../model/Contact');
const redisClient = require('../config/redis');

const CACHE_KEY = 'contact_data';
const CACHE_TTL = 3600;

const getContact = async (req, res) => {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      return res.status(200).json({ status: true, data: JSON.parse(cachedData) });
    }

    const contact = await contactModel.find();
    if (contact.length > 0) {
      await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(contact));
      res.status(200).json({ status: true, data: contact });
    } else {
      res.status(404).json({ status: false, msg: "No Contact found." });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "Error getting Contact" });
  }
}

module.exports = { getContact };