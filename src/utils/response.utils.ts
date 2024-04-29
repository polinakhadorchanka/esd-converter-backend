function SuccessResponse(data: Object) {
  return {
    data: data,
  };
}

function BadRequestResponse(message: string = 'Bad Request') {
  return {
    error: {
      status: 400,
      message: message,
    },
  };
}

function NotFoundResponse(message: string = 'Not Found') {
  return {
    error: {
      status: 404,
      message: message,
    },
  };
}

function ServerErrorResponse(message: string = 'Internal Server Error') {
  return {
    error: {
      status: 500,
      message: message,
    },
  };
}

module.exports = {
  SuccessResponse,
  BadRequestResponse,
  NotFoundResponse,
  ServerErrorResponse,
};
