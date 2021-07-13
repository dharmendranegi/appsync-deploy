const okResponse = (body = "success") => ({
  statusCode: 200,
  body: JSON.stringify(body)
});

const internalServerError = async (error = "Internal server error") => {
  return {
    statusCode: 500,
    message: error
  };
};

const createResponse = (data = "Requested data created successfully") => ({
  statusCode: 201,
  message: data
});

const updateResponse = (data = "Update successful") => ({
  statusCode: 200,
  message: data
});

const deleteResponse = data => ({
  statusCode: 204,
  message: data
});

module.exports.responseMessages = {
  internalServerError,
  okResponse,
  createResponse,
  updateResponse,
  deleteResponse
};
