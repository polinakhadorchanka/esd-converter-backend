const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { getTypeFromArrayBuffer } = require('./decoder.utils');

const readFile = (filepath: string) => {
  try {
    return fs.readFileSync(filepath);
  } catch (error) {
    throw new Error(`Cannot read file ${filepath}`);
  }
};

const copyFile = (filepath: string) => {
  try {
    const resultFilepath = `${process.env.STORAGE_PATH}${uuidv4()}`;
    fs.copyFileSync(filepath, resultFilepath);

    return resultFilepath;
  } catch (error) {
    throw new Error(`Cannot read file ${filepath}`);
  }
};

const deleteFile = (filepath: string) => {
  fs.unlink(filepath, (error: any) => {
    if (error) throw error;
  });
};

const writeFile = (filepath: string, value: string, options?: any) => {
  try {
    return fs.writeFileSync(filepath, value, options);
  } catch (error) {
    throw new Error(`Cannot write file ${filepath}`);
  }
};

const writeTempFile = (value: string, options?: any) => {
  try {
    const buffer = Buffer.from(value, 'base64');
    const fileType = getTypeFromArrayBuffer(buffer);

    const resultFilepath = `${process.env.STORAGE_PATH}${uuidv4()}${fileType}`;

    fs.writeFileSync(resultFilepath, value, options);

    return resultFilepath;
  } catch (error) {
    throw new Error(`Cannot write file`);
  }
};

const isFileExists = (filepath: string) => {
  try {
    return fs.existsSync(filepath);
  } catch (error) {
    throw new Error(`Cannot find file ${filepath}`);
  }
};

module.exports = { readFile, copyFile, deleteFile, writeFile, writeTempFile, isFileExists };
