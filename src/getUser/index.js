const tableName = process.env.DYNAMODB_TABLE;

const {
  okResponse,
  internalServerError,
  resourceNotFound
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
  //TODO  validate input

  const params = {
    TableName: tableName,
    Key: {
      id: event.id
    }
  };
  try {
    const data = await getItem(params);
    if (!("Item" in data)) {
      return resourceNotFound();
    }
    return okResponse(data.Item);
  } catch (err) {
    console.log("err", err);
    return internalServerError(err);
  }
};
