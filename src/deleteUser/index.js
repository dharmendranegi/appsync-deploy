// Function to delete user record in db.
const tableName = process.env.DYNAMODB_TABLE;

const {
  badRequestResponse,
  deleteResponse,
  internalServerError
} = require("../../Utils/responseCodes").responseMessages;
const { deleteUserInputValidation } = require("../../Utils/inputValidation");

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function deleteItem(params) {
  try {
    return await dynamoDb.delete(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async event => {
  console.log("Inside deleteUser function", event);
  const validationResult = deleteUserInputValidation(event);
  if (validationResult.length) return badRequestResponse(validationResult);

  const params = {
    TableName: tableName,
    Key: {
      id: event.id
    }
  };
  try {
    await deleteItem(params);
    return deleteResponse("Deleted Successfully");
  } catch (err) {
    console.log("err", err);
    return internalServerError(err);
  }
};
