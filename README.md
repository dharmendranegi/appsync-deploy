#### Current Architecture
![Appsync](./img/Flow.png?raw=true)

###Complete IAC for Appsync api integrated with lambda and dynamodb.

## Services used in the project.
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

####Steps to set up project:

### `npm install`
 - This will install all the required dependencies.

### `npm run format`
 - Launches the eslint to format the js files.

### `sls deploy`
 - Deploy it to aws account with default stage dev.
 - Resources:
    - Lambda.
    - DynamoDB.
    - S3 bucket for cloudformation stack logs and API Docs.
    - Cloudformation stack.
    - Appsync
    
### `CI/CD Setup`
##### Lambda configuration.
![functions](./img/functions.png?raw=true)

##### AppSync and DynamoDB configuration.
![functions](./img/appsync.png?raw=true)
  - Table with partition key as `id`
  - Used split stack plugin/config for distributing resources based on type with stack count `4`
 
### `Deployment jobs`
 - First check format of all the required js files
![format](./img/format.png?raw=true)
 - Deploy the stack in the dev and prod stage based on the branch
![deploy](./img/deploy.png?raw=true)


