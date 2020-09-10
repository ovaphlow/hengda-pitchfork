const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'hengda-pitchfork-dispatcher',
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'error',
      path: './hengda-pitchfork-dispatcher-error.log',
    },
  ],
});

module.exports = logger;
