const createClient = require('redis');

const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-13807.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 13807
    }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
