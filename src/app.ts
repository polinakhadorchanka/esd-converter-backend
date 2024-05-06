import { Request, Response } from 'express';
import express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { routes } = require('./routes');
const { ERR_NOT_FOUND, getError } = require('./utils/error.utils');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

/*app.get('*', (req: Request, res: Response) => {
  res.status(200).json(getError(ERR_NOT_FOUND));
});*/

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
