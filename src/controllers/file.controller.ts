import { Request, Response } from 'express';
const { ERR_ISE_FILE, getError } = require('../utils/error.utils');

class FileController {
  async getFile(req: Request, res: Response) {
    try {
      const filename = `uploads/${req.params.filename}`;

      res.download(filename);
    } catch (e) {
      return res.status(200).json(getError(ERR_ISE_FILE, e.message));
    }
  }
}

module.exports = new FileController();
