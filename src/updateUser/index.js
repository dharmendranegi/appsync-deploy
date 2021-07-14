// Function to create user record in db.
const tableName = process.env.DYNAMODB_TABLE;

const {
  badRequestResponse,
  updateResponse,
  internalServerError,
  resourceNotFound
} = require("../../Utils/responseCodes").responseMessages;
const { updateUserInputValidation } = require("../../Utils/inputValidation");

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function updateItem(params) {
  try {
    return await dynamoDb.update(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async event => {
  console.log("Inside update user function", event);
  const validationResult = updateUserInputValidation(event.userDetails);
  if (validationResult.length) return badRequestResponse(validationResult);
  const { userDetails } = event;
  const id = userDetails.id;
  delete userDetails.id;

  let updateExpression = "set";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};

  Object.keys(userDetails).forEach(function(key) {
    updateExpression += ` #${key} = :${key} ,`;
    ExpressionAttributeNames["#" + key] = key;
    ExpressionAttributeValues[":" + key] = userDetails[key];
  });

  console.log("updateExpression", updateExpression);
  console.log("ExpressionAttributeNames", ExpressionAttributeNames);
  console.log("ExpressionAttributeValues", ExpressionAttributeValues);

  const params = {
    TableName: tableName,
    Key: {
      id
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: ExpressionAttributeNames,
    ExpressionAttributeValues: ExpressionAttributeValues,
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await updateItem(params);
    console.log("data", data);

    if (!("Item" in data)) {
      return resourceNotFound();
    }
    return updateResponse(data);
  } catch (err) {
    console.log("err", err);
    return internalServerError(err);
  }
};
