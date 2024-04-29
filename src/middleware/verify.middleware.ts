import { NextFunction, Request, Response } from 'express';
import { DocToESDReqFiles } from '../types/files.types';
const { ERR_BR_VERIFY, getError } = require('../utils/error.utils');

const verifyEDSCheck = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as DocToESDReqFiles;

  try {
    if (!files?.mainDocument[0]) throw new Error('mainDocument is missing');

    next();
  } catch (e) {
    return res.status(200).json(getError(ERR_BR_VERIFY, e.message));
  }
};

module.exports = { verifyEDSCheck };
