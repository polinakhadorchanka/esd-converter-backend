import { NextFunction, Request, Response } from 'express';
import { DocToESDReqFiles, ESDToDocsReqFiles } from '../types/files.types';
const { ERR_BR_CONVERTER_DOC_TO_ESD, ERR_BR_CONVERTER_ESD_TO_DOCS, getError } = require('../utils/error.utils');

const docToESDCheck = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as DocToESDReqFiles;

  try {
    if (!files?.mainDocument[0]) throw new Error('mainDocument is missing');
    if (!files?.signatures || files.signatures.length === 0) throw new Error('signatures is missing');

    next();
  } catch (e) {
    return res.status(200).json(getError(ERR_BR_CONVERTER_DOC_TO_ESD, e.message));
  }
};

const ESDTODocsCheck = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as ESDToDocsReqFiles;

  try {
    if (!files?.esd[0]) throw new Error('mainDocument is missing');

    next();
  } catch (e) {
    return res.status(200).json(getError(ERR_BR_CONVERTER_ESD_TO_DOCS, e.message));
  }
};

module.exports = { docToESDCheck, ESDTODocsCheck };
