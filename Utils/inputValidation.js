const { mandatoryFieldsValidation } = require("../Utils/validators");
const createUserValidation = data => {
  const errors = [];
  const createUserMandatoryFields = ["emailId", "name"];

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
  const mandatoryFields = ["id"];
  const missingParameters = mandatoryFieldsValidation(mandatoryFields, data);
  if (missingParameters.length)
    errors.push(
      `Mandatory parameters are missing: ${missingParameters.join(",")}`
    );
  return errors;
};

const updateUserInputValidation = data => {
  const errors = [];
  const mandatoryFields = ["id"];

  const missingParameters = mandatoryFieldsValidation(mandatoryFields, data);
  if (missingParameters.length)
    errors.push(
      `Mandatory parameters are missing: ${missingParameters.join(",")}`
    );
  return errors;
};
const deleteUserInputValidation = data => {
  const errors = [];
  const mandatoryFields = ["id"];
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
