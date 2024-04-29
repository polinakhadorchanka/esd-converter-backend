import { Request, Response } from 'express';
import { VerifyFiles } from '../types/files.types';
const verifyProvider = require('../providers/verify.provider');
const { SuccessResponse } = require('../utils/response.utils');
const { ERR_ISE_VERIFY, getError } = require('../utils/error.utils');

class VerifyController {
  async verifyEDS(req: Request, res: Response) {
    try {
      const files = req.files as VerifyFiles;

      const verifyResult = await verifyProvider.verifyEDS(files.mainDocument[0], files.signatures);

      return res.status(200).json(SuccessResponse(verifyResult));
    } catch (e) {
      return res.status(200).json(getError(ERR_ISE_VERIFY, e.message));
    }
  }
}

module.exports = new VerifyController();
