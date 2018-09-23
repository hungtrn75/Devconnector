const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User Model
const User = require("../../models/User");

//@route  GET api/users/test
//@desc   Test user route
//@access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Users works"
  });
});

//@route  GET api/users/register
//@desc   Register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      const { name, email, password } = req.body;
      const avatar = gravatar.url(
        email,
        {
          s: "200", //size
          r: "pg", //rating
          d: "mm" //default
        },
        true
      );
      const newUser = new User({
        name,
        email,
        avatar,
        password
      });

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

//@route  GET api/users/login
//@desc   Login /Return jwt token for user
//@access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput({ email, password });
  if (!isValid) {
    return res.status(400).send(errors);
  }
  //Find by email
  User.findOne({ email }).then(user => {
    //Check user
    if (!user) {
      errors.email = "Email is invalid.";
      return res.status(404).json(errors);
    }
    //compare password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const token = user.genarateAuthToken();
        res.send({
          success: true,
          token: `Bearer ${token}`
        });
      } else {
        errors.password = "Password incorrect.";
        return res.status(404).json(errors);
      }
    });
  });
});

//@route  GET api/users/current
//@desc   Get current user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.send({
      id,
      name,
      email
    });
  }
);
module.exports = router;
