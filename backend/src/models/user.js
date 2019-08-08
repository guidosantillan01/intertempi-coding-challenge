const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error('Email is invalid. Use a correct email.');
      }
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;
