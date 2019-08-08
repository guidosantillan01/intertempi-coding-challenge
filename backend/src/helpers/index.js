const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async function(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (e) {
    throw new Error(e.message);
  }
};

const generateAuthToken = function(user) {
  return jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

module.exports = {
  hashPassword,
  generateAuthToken
};
