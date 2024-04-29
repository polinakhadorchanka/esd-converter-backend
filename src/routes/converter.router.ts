import express from 'express';
import { upload } from '../config/multer.config';
const converterMiddleware = require('../middleware/converter.middleware');
const converterController = require('../controllers/converter.controller');

export const ConverterRouter = express.Router();

ConverterRouter.post(
  '/doc-to-esd',
  upload.fields([{ name: 'mainDocument', maxCount: 1 }, { name: 'signatures' }]),
  converterMiddleware.docToESDCheck,
  converterController.convertDocToESD
);

ConverterRouter.post(
  '/esd-to-docs',
  upload.fields([{ name: 'esd', maxCount: 1 }]),
  converterMiddleware.ESDTODocsCheck,
  converterController.convertESDToDocs
);
