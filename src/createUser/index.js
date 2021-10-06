// Function to create user record in db.
const uuid = require("uuid");

const tableName = process.env.DYNAMODB_TABLE;

const {
  createResponse,
  internalServerError
} = require("../../Utils/responseCodes").responseMessages;

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function createItem(params) {
  try {
    await dynamoDb.put(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async event => {
  console.log("Inside createUser function", event);
  //TODO  validate input

  const id = uuid.v4();

  const params = {
    TableName: tableName,
    Item: {
      id,
      ...event
    }
  };
  console.log("params", params);

  try {
    await createItem(params);
    return createResponse(params.Item);
  } catch (err) {
    console.log("err", err);
    return internalServerError(err);
  }
};
