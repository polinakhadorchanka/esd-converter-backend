import { Signature } from '../types/signature.types';

const { execAvCmUt4 } = require('../utils/avcmut4.utils');
const { arraybufferToBase64, arraybufferToString } = require('../utils/decoder.utils');
const { readFile, deleteFile } = require('../utils/file-processing.utils');
const { createTempFileLink, createTempArchiveLink } = require('../utils/link.utils');
const { getESDContent, getContentFileFromESD, getSignatureFilesFromESD } = require('../utils/converter.utils');

async function convertDocToESD(mainDocument: Express.Multer.File, signatures: Express.Multer.File[]) {
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
    const logFiles: string[] = [];

    const docData = arraybufferToBase64(readFile(mainDocument.path));
    const signaturesData: Signature[] = signatures.map((sign) => {
      const logFilepath = execAvCmUt4(mainDocument.path, sign.path);
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

    const esdData = getESDContent(docData, signaturesData);
    const fileLink = createTempFileLink(process.env.STORAGE_PATH, 'esd', esdData);

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
      link: fileLink,
    };
  } catch (error) {
    throw error;
  }
}

async function convertESDToDocs(esd: Express.Multer.File) {
  function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

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
    const contentFile = getContentFileFromESD(esd);
    const signatureFiles: string[] = getSignatureFilesFromESD(esd);

    const files = [
      { name: `data.${contentFile.split('.').splice(-1)}`, path: contentFile },
      ...signatureFiles.map((signatureFile, index) => {
        return {
          name: `sign_${index + 1}.${signatureFile.split('.').splice(-1)}`,
          path: signatureFile,
        };
      }),
    ];

    const link = createTempArchiveLink(files, 600000, async () => {
      deleteFiles([esd.path, contentFile, ...signatureFiles]);
    });

    await sleep(1000);

    return { link };
  } catch (error) {
    throw error;
  }
}

module.exports = { convertDocToESD, convertESDToDocs };
