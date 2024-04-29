import path from 'path';
import multer from 'multer';
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.env.STORAGE_PATH ?? 'uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}`);
  },
});

export const upload = multer({ storage: storage });
