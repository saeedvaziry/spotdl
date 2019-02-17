const kue = require('kue');

const queue = kue.createQueue({
  redis: process.env.REDIS_URL
});

exports.download = async (req, res) => {
  if (!req.body.link || !req.body.browserId) {
    res.status(422).json({
      message: 'Invalid data!'
    });
    return;
  }
  if (req.body.link.indexOf('https://open.spotify.com/track/') > -1) {
    const job = await queue.create('download', {
      link: req.body.link,
      browserId: req.body.browserId
    }).priority('high').save((err) => {
      if (!err) {
        res.status(200).json({
          message: 'OK',
          id: job.id
        });
      }
    });
  } else {
    res.status(422).json({
      message: 'Invalid spotify url!'
    });
  }
};

exports.cancelDownload = (req, res) => {
  if (!req.body.id) {
    res.status(422).json({
      message: 'Invalid data!'
    });
    return;
  }
  kue.Job.get(req.body.id, (err, job) => {
    if (!err) {
      job.failed();
      res.status(200).json({
        message: 'OK',
      });
    } else {
      res.status(422).json({
        message: 'Invalid data!'
      });
    }
  });
};
