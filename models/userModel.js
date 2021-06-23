const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// MODEL OUR SCHEMA
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'please provide first name'],
  },
  secondName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, 'please provide valid email'],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'passwords are not same',
    },
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
  },
});

// to encrypt the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

//instance methods
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTtimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(changedTimeStamp, JWTtimeStamp);
    return JWTtimeStamp < changedTimeStamp;
  }
  return false;
};

// CREATE  MODEL FROM SCHEMA
const User = mongoose.model('User', userSchema);

module.exports = User;
