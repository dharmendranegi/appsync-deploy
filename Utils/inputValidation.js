const { mandatoryFieldsValidation } = require("./validators");

const createUserValidation = data => {
  const errors = [];
  const createUserMandatoryFields = [
    "name",
    "emailId"
  ];

  const mandatoryFieldsValidationForUsers = (mandatoryFieldsArray, dataObj) =>
    mandatoryFieldsArray.filter(
      field =>
        !Object.keys(dataObj).includes(field) ||
        dataObj[field] === null ||
        dataObj[field] === ""
    );

  const missingParameters = mandatoryFieldsValidationForUsers(
    createUserMandatoryFields,
    data
  );

  if (missingParameters.length)
    errors.push(
      `Mandatory parameters are missing: ${missingParameters.join(",")}`
    );

  return errors;
};

const getUserValidation = data => {
  const errors = [];
  const mandatoryFields = ["userId"];
  const missingParameters = mandatoryFieldsValidation(mandatoryFields, data);
  if (missingParameters.length)
    errors.push(
      `Mandatory parameters are missing: ${missingParameters.join(",")}`
    );
  return errors;
};

const updateUserInputValidation = data => {
  const errors = [];

  const mandatoryFields = ["userId"];
  const mandatoryFieldsValidationForGetUser = (mandatoryFieldsArray, dataObj) =>
    mandatoryFieldsArray.filter(
      field =>
        !Object.keys(dataObj).includes(field) ||
        dataObj[field] === null ||
        dataObj[field] === ""
    );
  const missingParameters = mandatoryFieldsValidationForGetUser(
    mandatoryFields,
    data
  );
  if (missingParameters.length)
    errors.push(
      `Mandatory parameters are missing: ${missingParameters.join(",")}`
    );
  return errors;
};


const deleteUserInputValidation = data => {
  const errors = [];
  const mandatoryFields = ["userId"];
  const missingParameters = mandatoryFieldsValidation(mandatoryFields, data);
  if (missingParameters.length)
    errors.push(
      `Mandatory parameters are missing: ${missingParameters.join(",")}`
    );
  return errors;
};

module.exports = {
  createUserValidation,
  getUserValidation,
  deleteUserInputValidation,
  updateUserInputValidation
};
