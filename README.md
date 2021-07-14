#### Current Architecture
![Appsync](https://appsync-deploy-docs.s3.ap-south-1.amazonaws.com/appsync.PNG)

###Complete IAC for Appsync api integrated with lambda and dynamodb.

## Services used in the project.
  - AWS cloud.
  - AWS Lambda
  - AWS Appsync
  - DynamoDB
  - S3 Bucket
  - Cloudformation
  - Cloudwatch
  - Serverless Framework for deployment.
  - GitHub actions for continuous integration and continuous delivery.
  - Webpack for build package.
  - Eslint for file formatter.

####Steps to run:

### `npm install`
 - This will install all the required dependencies.

### `npm run format`
 - Launches the eslint to format the js files.

### `sls deploy`
 - This command will deploy it to aws account with default stage dev.
 - And will create following resources:
    - Lambda.
    - DynamoDB.
    - S3 bucket for cloudformation stack logs and API Docs.
    - Cloudformation stack.
    - Appsync
  
