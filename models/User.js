const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../configs/keys");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else next();
});

UserSchema.methods.genarateAuthToken = function() {
  let user = this;
  let access = "auth";
  const payload = { id: user.id, name: user.name, avatar: user.avatar, access };
  return jwt.sign(payload, secretKey, { expiresIn: 3600 }).toString();
};

module.exports = User = mongoose.model("users", UserSchema);
