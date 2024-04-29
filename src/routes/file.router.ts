import express from 'express';
const fileMiddleware = require('../middleware/file.middleware');
const fileController = require('../controllers/file.controller');

export const FileRouter = express.Router();

FileRouter.get('/:filename', fileMiddleware.getFileCheck, fileController.getFile);
