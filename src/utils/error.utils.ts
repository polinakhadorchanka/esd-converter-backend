const response = require('./response.utils');

const ERR_NOT_FOUND = 'ERR_NOT_FOUND';

const ERR_BR_CONVERTER_DOC_TO_ESD = 'ERR_BR_CONVERTER_DOC_TO_ESD';
const ERR_ISE_CONVERTER_DOC_TO_ESD = 'ERR_ISE_CONVERTER_DOC_TO_ESD';

const ERR_BR_CONVERTER_ESD_TO_DOCS = 'ERR_BR_CONVERTER_ESD_TO_DOCS';
const ERR_ISE_CONVERTER_ESD_TO_DOCS = 'ERR_ISE_CONVERTER_ESD_TO_DOCS';

const ERR_BR_VERIFY = 'ERR_BR_VERIFY';
const ERR_ISE_VERIFY = 'ERR_ISE_VERIFY';

const ERR_BR_FILE = 'ERR_BR_FILE';
const ERR_ISE_FILE = 'ERR_BR_FILE';

function getError(errorCode: string, message?: string) {
  switch (errorCode) {
    case ERR_NOT_FOUND:
      return response.NotFoundResponse(`Error: ${ERR_NOT_FOUND}${message ? ` - ${message}` : ''}`);
    case ERR_BR_CONVERTER_DOC_TO_ESD:
      return response.BadRequestResponse(`Error: ${ERR_BR_CONVERTER_DOC_TO_ESD}${message ? ` - ${message}` : ''}`);
    case ERR_ISE_CONVERTER_DOC_TO_ESD:
      return response.ServerErrorResponse(`Error: ${ERR_ISE_CONVERTER_DOC_TO_ESD}${message ? ` - ${message}` : ''}`);
    case ERR_BR_CONVERTER_ESD_TO_DOCS:
      return response.BadRequestResponse(`Error: ${ERR_BR_CONVERTER_ESD_TO_DOCS}${message ? ` - ${message}` : ''}`);
    case ERR_ISE_CONVERTER_ESD_TO_DOCS:
      return response.ServerErrorResponse(`Error: ${ERR_ISE_CONVERTER_ESD_TO_DOCS}${message ? ` - ${message}` : ''}`);
    case ERR_BR_VERIFY:
      return response.BadRequestResponse(`Error: ${ERR_BR_FILE}${message ? ` - ${message}` : ''}`);
    case ERR_ISE_VERIFY:
      return response.ServerErrorResponse(`Error: ${ERR_ISE_VERIFY}${message ? ` - ${message}` : ''}`);
    case ERR_BR_FILE:
      return response.BadRequestResponse(`Error: ${ERR_BR_FILE}${message ? ` - ${message}` : ''}`);
    case ERR_ISE_FILE:
      return response.ServerErrorResponse(`Error: ${ERR_ISE_FILE}${message ? ` - ${message}` : ''}`);
  }
}

module.exports = {
  ERR_NOT_FOUND,
  ERR_BR_CONVERTER_DOC_TO_ESD,
  ERR_ISE_CONVERTER_DOC_TO_ESD,
  ERR_BR_CONVERTER_ESD_TO_DOCS,
  ERR_ISE_CONVERTER_ESD_TO_DOCS,
  ERR_BR_VERIFY,
  ERR_ISE_VERIFY,
  ERR_BR_FILE,
  ERR_ISE_FILE,
  getError,
};
