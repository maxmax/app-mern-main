const jwt = require("jsonwebtoken");

const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "10d",
  });
  return token;
};

module.exports = getToken;
