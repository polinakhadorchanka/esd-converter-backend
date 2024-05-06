const log4js = require('log4js');
const fs = require('fs');

let logger;

const setLogger = () => {
  const filename = process.env.LOG_PATH + '.log';

  if (!fs.existsSync(filename)) {
    fs.closeSync(fs.openSync(filename, 'w'));
  }

  const appenders: any = {};
  appenders[process.env.LOG_APPENDERS as string] = {
    type: 'file',
    filename: filename,
  };

  log4js.configure({
    appenders: appenders,
    categories: {
      default: {
        appenders: [process.env.LOG_APPENDERS],
        level: process.env.LOG_LEVEL,
      },
    },
  });

  logger = log4js.getLogger(process.env.LOG_APPENDERS);
};

setLogger();

export {};
module.exports = logger;
