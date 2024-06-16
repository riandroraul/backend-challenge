const errorResult = (error: any, res: any, statusCode: any) => {
  if (error != null && error instanceof Error) {
    return res.status(statusCode).send({
      success: false,
      status: statusCode,
      message: error.message,
      errors: error,
    });
  }
  return res.status(statusCode).json({
    status: 500,
    message: "internal server error",
    errors: error,
  });
};

const responseSuccess = (
  success: boolean,
  statusCode: number,
  message: string | null,
  data: any | null,
  error: any | null
) => {
  if (error != null && error instanceof Error) {
    return {
      success,
      statusCode,
      message: error.message,
      data: null,
      errors: error,
    };
  }
  return { success, statusCode, message, data, errors: error };
};

const responseData = (
  status: number,
  message: string | null,
  error: any | null,
  data: any | null
) => {
  if (error != null && error instanceof Error) {
    const response = {
      status: status,
      message: error.message,
      errors: error,
      data: null,
    };

    return response;
  }

  const res = {
    status,
    message,
    errors: error,
    data: data,
  };

  return res;
};

export default { errorResult, responseSuccess, responseData };
