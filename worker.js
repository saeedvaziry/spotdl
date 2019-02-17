const io = require('socket.io')(process.env.NODEJS_PORT);
const socketRedis = require('socket.io-redis');
const redis = require('redis');
const kue = require('kue');
const dotenv = require('dotenv');
const { exec } = require('child_process');

dotenv.load({
  path: '.env'
});

// Connect redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

// Connect queue to redis
const queue = kue.createQueue({
  redis: process.env.REDIS_URL
});

io.adapter(socketRedis({
  url: process.env.REDIS_URL
}));

async function download(job, done) {
  exec(`python3 ./spotdl/get-file-name.py --song ${job.data.link}`, (err, stdout) => {
    const fileName = stdout;
    exec(`python3 ./spotdl/download.py --song ${job.data.link} -f ./${process.env.DL_PATH} --overwrite skip`, () => {
      redisClient.get(job.data.browserId, (err, socketId) => {
        if (!err) {
          console.log('done');
          io.to(socketId).emit('downloaded', {
            url: `/dl/${fileName}`,
            id: job.id
          });
          done();
        } else {
          console.log(err);
        }
      });
    });
  });
}

queue.process('download', (job, done) => {
  download(job, done);
});
