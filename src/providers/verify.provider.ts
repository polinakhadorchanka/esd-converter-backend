import { Signature } from '../types/signature.types';

const { execAvCmUt4 } = require('../utils/avcmut4.utils');
const { arraybufferToBase64, arraybufferToString } = require('../utils/decoder.utils');
const { readFile, deleteFile } = require('../utils/file-processing.utils');
const { createTempFileLink } = require('../utils/link.utils');

async function verifyEDS(mainDocument: Express.Multer.File, signatures?: Express.Multer.File[]) {
  const deleteFiles = (files: string[]) => {
    try {
      files.forEach((file) => {
        deleteFile(file);
      });
    } catch (error) {
      throw error;
    }
  };

  try {
    if (signatures) {
      const logFiles: string[] = [];

      const signaturesData: Signature[] = signatures?.map((sign) => {
        const logFilepath = execAvCmUt4(mainDocument.path, sign.path) ?? '';

        logFiles.push(logFilepath as string);

        const logData = arraybufferToString(readFile(logFilepath as string))
          .toString()
          .split('\n');

        const tmpDate = logData[9].split(': ')[1];
        const convertDate = tmpDate.split('.')[1] + '.' + tmpDate.split('.')[0] + '.' + tmpDate.split('.')[2];

        const date = new Date(convertDate);
        const signatory =
          logData[10].slice(logData[10].indexOf('OID.2.5.4.4') + 12, logData[10].indexOf(', OID.2.5.4.41')) +
          ' ' +
          logData[10].slice(logData[10].indexOf('OID.2.5.4.41') + 13, logData[10].length - 2);

        const signData = arraybufferToBase64(readFile(sign.path));

        return {
          Subject: logData[10].slice(18, -2),
          Person: signatory,
          Date: date,
          Result: logData[13].slice(18, -1),
          Value: signData,
        };
      });

      deleteFiles([mainDocument.path, ...signatures.map((sign) => sign.path), ...logFiles]);

      return {
        signatures: signaturesData.map((signature) => {
          return {
            subject: signature.Subject,
            person: signature.Person,
            date: signature.Date,
            result: signature.Result,
          };
        }),
      };
    } else {
      const logFilepath = execAvCmUt4(mainDocument.path);

      const logData = arraybufferToString(readFile(logFilepath as string))
        .toString()
        .split('\n');

      const tmpDate = logData[9].split(': ')[1];
      const convertDate = tmpDate.split('.')[1] + '.' + tmpDate.split('.')[0] + '.' + tmpDate.split('.')[2];

      const date = new Date(convertDate);
      const signatory =
        logData[10].slice(logData[10].indexOf('OID.2.5.4.4') + 12, logData[10].indexOf(', OID.2.5.4.41')) +
        ' ' +
        logData[10].slice(logData[10].indexOf('OID.2.5.4.41') + 13, logData[10].length - 2);

      const signature = {
        subject: logData[10].slice(18, -2),
        person: signatory,
        date: date,
        result: logData[13].slice(18, -1),
      };

      logData.splice(3, 1);
      logData.splice(6, 1);

      const fileLink = createTempFileLink(process.env.STORAGE_PATH, 'txt', logData.join('\n'));

      deleteFiles([mainDocument.path, logFilepath as string]);

      return {
        signatures: [signature],
        link: fileLink,
      };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { verifyEDS };
