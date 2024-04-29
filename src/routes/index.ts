import express from 'express';
import { ConverterRouter } from './converter.router';
import { FileRouter } from './file.router';
import { VerifyRouter } from './verify.router';

export const routes = express.Router();

routes.use('/converter', ConverterRouter);
routes.use('/file', FileRouter);
routes.use('/verify', VerifyRouter);
