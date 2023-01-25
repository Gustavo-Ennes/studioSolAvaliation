const { pipe, curry, find, propEq } = require("ramda");

const {
  minSize,
  minUppercase,
  minLowercase,
  minDigit,
  minSpecialChars,
  noRepeated,
} = require("./validation");

// general validation function. It calls the real validation function provided in parameters
// ramda docs: https://ramdajs.com/docs/#pipe
const validate = curry(
  ({ validateFunction, validationName }, { password, rules, responseObj }) => {
    // find a corresponding rule in validation.js if it exists
    const rule = find(propEq("rule", validationName))(rules);

    if (rule) {
      responseObj.passValidation = validateFunction({
        password,
        ruleValue: rule.value,
      });
      // write to response object only if it' has a different than false value
      // if it's false, the validation already fails
      responseObj.verify = !responseObj.verify
        ? responseObj.verify
        : responseObj.passValidation;
    }
    // and if validation fails, push to the noMatch array
    if (!responseObj.passValidation && rule) {
      responseObj.noMatch.push(validationName);
    }

    return { password, rules, responseObj };
  }
);

const verifyResolver = (args, obj, ctx) => {
  const { password, rules } = args;
  // response object that will run down the pipe along password and rules
  const responseObj = {
    verify: true,
    noMatch: [],
    passValidation: false,
  };

  pipe(
    validate({ validateFunction: minSize, validationName: "minSize" }),
    validate({
      validateFunction: minUppercase,
      validationName: "minUppercase",
    }),
    validate({
      validateFunction: minLowercase,
      validationName: "minLowercase",
    }),
    validate({ validateFunction: minDigit, validationName: "minDigit" }),
    validate({
      validateFunction: minSpecialChars,
      validationName: "minSpecialChars",
    }),
    validate({ validateFunction: noRepeated, validationName: "noRepeated" })
  )({ password, rules, responseObj });

  return responseObj;
};

module.exports = {
  verifyResolver,
};
