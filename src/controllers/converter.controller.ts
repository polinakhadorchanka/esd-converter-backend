import { Request, Response } from 'express';
import { DocToESDReqFiles, ESDToDocsReqFiles } from '../types/files.types';
const converterProvider = require('../providers/converter.provider');
const { SuccessResponse } = require('../utils/response.utils');
const { ERR_ISE_CONVERTER_DOC_TO_ESD, ERR_ISE_CONVERTER_ESD_TO_DOCS, getError } = require('../utils/error.utils');

class ConverterController {
  async convertDocToESD(req: Request, res: Response) {
    try {
      const files = req.files as DocToESDReqFiles;

      const convertedDoc = await converterProvider.convertDocToESD(files.mainDocument[0], files.signatures);

      return res.status(200).json(SuccessResponse(convertedDoc));
    } catch (e) {
      return res.status(200).json(getError(ERR_ISE_CONVERTER_DOC_TO_ESD, e.message));
    }
  }

  async convertESDToDocs(req: Request, res: Response) {
    try {
      const files = req.files as ESDToDocsReqFiles;

      const convertedDoc = await converterProvider.convertESDToDocs(files.esd[0]);

      return res.status(200).json(SuccessResponse(convertedDoc));
    } catch (e) {
      return res.status(200).json(getError(ERR_ISE_CONVERTER_ESD_TO_DOCS, e.message));
    }
  }
}

module.exports = new ConverterController();
