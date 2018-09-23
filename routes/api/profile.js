const express = require("express");
const router = express.Router();
const passport = require("passport");

//Validate input profile
const validateProfileInput = require("../../validation/profile");
//Load user model
const User = require("../../models/User");
//Load profile model
const Profile = require("../../models/Profile");

//@route  GET api/profile/test
//@desc   Test profile route
//@access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Profile works"
  });
});

//@route  GET api/profile
//@desc   Get profile of current user
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.profile = "No profile for this user.";
          return res.status(404).send(errors);
        }
        return res.send(profile);
      })
      .catch(err => res.status(404).send(err));
  }
);

//@route  Post api/profile
//@desc   Post profile of current user
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    let profileFields = {};
    const {
      handle,
      company,
      website,
      location,
      bio,
      status,
      githubID,
      date
    } = req.body;
    const { youtube, facebook, twitter, linkedin, instagram } = req.body;
    //add user to profile
    profileFields.user = req.user.id;
    //Add skill object
    if (req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");
    profileFields = {
      ...profileFields,
      handle,
      company,
      website,
      location,
      bio,
      status,
      githubID,
      date,
      social: {
        youtube,
        facebook,
        twitter,
        linkedin,
        instagram
      }
    };

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.send(profile));
      } else {
        //Create profile

        //Check handle exist
        Profile.findOne({ handle }).then(profile => {
          if (profile) {
            errors.handle = "Tha handle already exist.";
            return res.status(400).json(errors);
          }

          new Profile(profileFields).save().then(profile => res.send(profile));
        });
      }
    });
  }
);
module.exports = router;
