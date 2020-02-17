const { env } = require('process');
const config = {
  DATA_STORE: env.DATA_STORE,
  sessions: env.session || JSON.stringify([{ sid: 1, userName: 'a' }])
};
module.exports = config;
