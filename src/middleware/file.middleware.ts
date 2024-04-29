import { NextFunction, Request, Response } from 'express';
const { isFileExists } = require('../utils/file-processing.utils');
const { ERR_BR_FILE, getError } = require('../utils/error.utils');

const getFileCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.filename) throw new Error('filename is missing');

    const filename = `uploads/${req.params.filename}`;
    if (isFileExists(filename)) next();
    else throw new Error(`file ${req.params.filename} does not exist`);
  } catch (e) {
    return res.status(200).json(getError(ERR_BR_FILE, e.message));
  }
};

module.exports = { getFileCheck };
