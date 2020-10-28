module.exports = (password) => {

  const disallowedRegex = '(?=.*[£"\'\\\\])';
  const lowerCaseRegex = "(?=.*[a-z])";
  const upperCaseRegex = "(?=.*[A-Z])";
  const numericRegex = "(?=.*[0-9])";
  const symbolsRegex = '(?=.*[!#$%&()*+,\-.:;<=>?@\\][_\^`{|}~])';

  let strength = {
    id: null,
    value: null,
    length: null,
    contains: [],
  };

  // Default
  let passwordContains = [];

  if (new RegExp(`^${lowerCaseRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "lowercase",
      },
    ];
  }

  if (new RegExp(`^${upperCaseRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "uppercase",
      },
    ];
  }

  if (new RegExp(`^${symbolsRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "symbol",
      },
    ];
  }

  if (new RegExp(`^${numericRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "number",
      },
    ];
  }

  if (new RegExp(`^${disallowedRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "disallowed",
      },
    ];
  }

  const strongRegex = new RegExp(
    `^((${lowerCaseRegex}${upperCaseRegex}${numericRegex})|(${lowerCaseRegex}${upperCaseRegex}${symbolsRegex})|(${lowerCaseRegex}${numericRegex}${symbolsRegex})|(${upperCaseRegex}${numericRegex}${symbolsRegex}))(?=.{8,})`
  );
  const extraStrongRegex = new RegExp(
    `^${lowerCaseRegex}${upperCaseRegex}${numericRegex}${symbolsRegex}(?=.{8,})`
  );
  const mediumRegex = new RegExp(
    `^((${lowerCaseRegex}${upperCaseRegex})|(${lowerCaseRegex}${numericRegex})|(${upperCaseRegex}${numericRegex})|(${upperCaseRegex}${symbolsRegex})|(${lowerCaseRegex}${symbolsRegex})|(${numericRegex}${symbolsRegex}))(?=.{6,})`
  );

  if (extraStrongRegex.test(password)) {
    strength = {
      id: 3,
      value: "Extra Strong",
    };
  } else if (strongRegex.test(password)) {
    strength = {
      id: 2,
      value: "Strong",
    };
  } else if (mediumRegex.test(password)) {
    strength = {
      id: 1,
      value: "Medium",
    };
  } else {
    strength = {
      id: 0,
      value: "Weak",
    };
  }
  strength.length = password.length;
  strength.contains = passwordContains;
  return strength;
};
