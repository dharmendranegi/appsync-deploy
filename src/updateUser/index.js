// Function to create user record in db.
const tableName = process.env.DYNAMODB_TABLE;

const { updateUserInputValidation } = require("../../Utils/inputValidation");
const {
  badRequestResponse,
  updateResponse,
  internalServerError
} = require("../../Utils/responseCodes").responseMessages;

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function updateItem() {
  try {
    return await dynamoDb.update(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async event => {
  console.log("Inside update user function", event);

  const validationResult = getUserValidation(event);
  if (validationResult.length) return badRequestResponse(validationResult);

  const params = {
    TableName: tableName,
    Key: {
      id: event.user_id
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues: {
      ":r": 5.5,
      ":p": "Everything happens all at once.",
      ":a": ["Larry", "Moe", "Curly"]
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await updateItem(params);
    return okResponse(data);
  } catch (err) {
    return internalServerError(error);
  }
};
