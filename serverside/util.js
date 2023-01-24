const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  // Encrypting Password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = { encryptPassword };
