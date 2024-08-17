const redis = require('redis');

const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-13807.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 13807
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error('Failed to connect to Redis', err);
  }
})();

module.exports = redisClient;
