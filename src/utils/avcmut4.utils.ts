import { execSync } from 'child_process';
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger.utils');

function execAvCmUt4(docPath: string, signPath?: string) {
  try {
    const resultFilepath = `${process.cwd()}/${process.env.STORAGE_PATH}${uuidv4()}`;

    if (signPath) execSync(`AvCmUt4.exe -V "${signPath}" -F "${docPath}" -NA -LOG "${resultFilepath}"`);
    else execSync(`AvCmUt4.exe -V "${docPath}" -NA -LOG "${resultFilepath}.log"`);

    return resultFilepath;
  } catch (error) {
    logger.error('execAvCmUt4 ERROR: ', error);
    return new Error('Command AvCmUt4.exe failed ');
  }
}

module.exports = { execAvCmUt4 };