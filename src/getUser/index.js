// Function to create user record in db.
const tableName = process.env.DYNAMODB_TABLE;

const { getUserValidation } = require("../../Utils/inputValidation");
const {
  badRequestResponse,
  okResponse,
  internalServerError
} = require("../../Utils/responseCodes").responseMessages;

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function getItem(params) {
  try {
    return await dynamoDb.get(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async event => {
  console.log("Inside get user details function", event);

  const validationResult = getUserValidation(event);
  if (validationResult.length) return badRequestResponse(validationResult);

  const params = {
    TableName: tableName,
    Key: {
      id: event.user_id
    }
  };
  try {
    const data = await getItem(params);
    return okResponse(data);
  } catch (err) {
    return internalServerError(error);
  }
};
