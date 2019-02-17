const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

exports.connect = (io, socket) => {
  const browserId = socket.handshake.query.browserId;
  if (browserId) {
    socket.browserId = browserId;
    redisClient.set(browserId, socket.id);
    io.to(socket.id).emit('connected', {
      message: 'connected'
    });
  }
};
