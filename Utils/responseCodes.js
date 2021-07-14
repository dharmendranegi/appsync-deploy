const okResponse = (body = "success") => ({
  statusCode: 200,
  body: JSON.stringify(body)
});

const internalServerError = async error => {
  return {
    statusCode: 500,
    body: JSON.stringify(error)
  };
};

const createResponse = (data = "Requested data created successfully") => ({
  statusCode: 201,
  body: JSON.stringify(data)
});

const updateResponse = (data = "Update successful") => ({
  statusCode: 200,
  body: JSON.stringify(data)
});

const deleteResponse = data => ({
  statusCode: 204,
  body: JSON.stringify(data)
});

const badRequestResponse = data => ({
  statusCode: 400,
  body: JSON.stringify(data)
});

const resourceNotFound = (body = "Requested resource not found") => ({
  statusCode: 404,
  body
});

module.exports.responseMessages = {
  internalServerError,
  okResponse,
  createResponse,
  updateResponse,
  deleteResponse,
  badRequestResponse,
  resourceNotFound
};
