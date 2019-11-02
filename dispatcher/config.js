const os = require('os')

const config = {
  env: 'development',
  app: {
    port: 5000,
    numChildProcesses: os.cpus().length
  },
  bizService: {
    host: '127.0.0.1',
    port: 5001
  }
}

module.exports = config
