import express from 'express';
import { upload } from '../config/multer.config';
const verifyMiddleware = require('../middleware/verify.middleware');
const verifyController = require('../controllers/verify.controller');

export const VerifyRouter = express.Router();

VerifyRouter.post(
  '/',
  upload.fields([{ name: 'mainDocument', maxCount: 1 }, { name: 'signatures' }]),
  verifyMiddleware.verifyEDSCheck,
  verifyController.verifyEDS
);
