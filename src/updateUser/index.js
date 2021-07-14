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

async function updateItem() {
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
  userDetails.updatedAt = event.updatedAt;
  const id = userDetails.id;
  delete userDetails.id;

  let updateExpression = "set";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};

  Object.keys(userDetails).forEach(function(key) {
    console.log("Key : " + key + ", Value : " + data[key]);
    updateExpression += ` #${data[key]} = :${data[key]} ,`;
    ExpressionAttributeNames["#" + data[key]] = data[key];
    ExpressionAttributeValues[":" + data[key]] = Item[data[key]];
  });
  // for (const property in Item) {
  //   updateExpression += ` #${property} = :${property} ,`;
  //   ExpressionAttributeNames['#'+property] = property ;
  //   ExpressionAttributeValues[':'+property]=Item[property];
  // }
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
