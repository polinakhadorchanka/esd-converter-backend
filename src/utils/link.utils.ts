import fs from 'fs';

const { v4: uuidv4 } = require('uuid');
const archiver = require('archiver');

const { writeFile, deleteFile } = require('../utils/file-processing.utils');

const createTempFileLink = (filepath: string, type: string, value: string, timeout: number = 600000) => {
  try {
    const fileName = `${uuidv4()}.${type}`,
      path = `${process.env.STORAGE_PATH}${fileName}`;
    writeFile(path, value);

    setTimeout(() => {
      deleteFile(path);
    }, timeout);

    return `${process.env.SELF_URL}:${process.env.PORT}/file/${fileName}`;
  } catch (error) {
    throw new Error(`Cannot write file ${filepath}`);
  }
};

const createTempArchiveLink = (
  files: { name: string; path: string }[],
  timeout: number = 600000,
  callback?: () => void
) => {
  try {
    const archiveName = `${uuidv4()}.zip`,
      path = `${process.env.STORAGE_PATH}${archiveName}`;

    const output = fs.createWriteStream(path);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', function () {
      callback && callback();
    });

    archive.pipe(output);

    files.forEach((file) => {
      archive.file(file.path, { name: file.name });
    });

    archive.finalize();

    setTimeout(() => {
      deleteFile(path);
    }, timeout);

    return `${process.env.SELF_URL}:${process.env.PORT}/file/${archiveName}`;
  } catch (error) {
    throw new Error(`Cannot write archive`);
  }
};

module.exports = { createTempFileLink, createTempArchiveLink };
