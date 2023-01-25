const minSize = ({ password, ruleValue }) => password.length >= ruleValue;

const minUppercase = ({ password, ruleValue }) =>
  (password.match(/[A-Z]/g) || "").length >= ruleValue;

const minLowercase = ({ password, ruleValue }) =>
  (password.match(/[a-z]/g) || "").length >= ruleValue;

const minDigit = ({ password, ruleValue }) =>
  (password.match(/[0-9]/g) || "").length >= ruleValue;

const minSpecialChars = ({ password, ruleValue }) =>
  (password.match(/[!@#\$%\^&\*\(\)\-\+\/{}\[\]]/gm) || "").length >= ruleValue;

const noRepeated = ({ password }) => {
  const results = password
    .split("")
    .map((letter, index) =>
      password[index + 1] ? letter !== password[index + 1] : true
    );
  return !results.includes(false);
};

module.exports = {
  minSize,
  minUppercase,
  minLowercase,
  minDigit,
  minSpecialChars,
  noRepeated,
};
