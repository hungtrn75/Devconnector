const express = require("express");
const router = express.Router();
const passport = require("passport");

//Validate input profile
const validateProfileInput = require("../../validation/profile");
//Validate experience input profile
const validateExperienceInput = require("../../validation/profile/experience");
//Validate education input profile
const validateEducationInput = require("../../validation/profile/education");
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
    const {
      query: { id, handle }
    } = req;
    console.log(id, handle);
    if (!!id) {
      Profile.findOne({ user: id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            errors.profile = "No profile for this user.";
            return res.status(404).send(errors);
          }
          return res.send(profile);
        })
        .catch(err => res.status(404).send(err));
    } else if (!!handle) {
      Profile.findOne({ handle: handle })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            errors.profile = "No profile for this user.";
            return res.status(404).send(errors);
          }
          return res.send(profile);
        })
        .catch(err => res.status(404).send(err));
    } else {
      errors.profile = "No profile for this user.";
      return res.status(404).send(errors);
    }
  }
);

//@route  GET api/profile
//@desc   Get profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "No profile for this user.";
        return res.status(404).send(errors);
      }
      return res.send(profile);
    })
    .catch(err => res.status(404).send(err));
});

//@route  GET api/profile/all
//@desc   Get all profile
//@access Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find()
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.profile = "No profile to fetch.";
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

          new Profile(profileFields).save().then(profile => {
            return res.send(profile);
          });
        });
      }
    });
  }
);

//@route  Post api/profile/experience
//@desc   Post experience of current user
//@access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const { errors, isValid } = validateExperienceInput(req.body);
      if (!isValid) {
        return res.status(404).send(errors);
      }
      const newExp = ({
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body);

      profile.experience.unshift(newExp);
      profile.save().then(profile => res.send(profile));
    });
  }
);

//@route  Post api/profile/education
//@desc   Post experience of current user
//@access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const { errors, isValid } = validateEducationInput(req.body);
      if (!isValid) {
        return res.status(404).send(errors);
      }
      const newEdu = ({
        school,
        degree,
        fieldOfStydy,
        from,
        to,
        current,
        description
      } = req.body);

      profile.education.unshift(newEdu);
      profile.save().then(profile => res.send(profile));
    });
  }
);

//@route  Post api/profile/education
//@desc   Post experience of current user
//@access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(edu => edu.id)
          .indexOf(req.params.edu_id);
        //Splice out from array
        if (removeIndex !== -1) {
          profile.education.splice(removeIndex, 1);
          //Save
          return profile.save().then(profile => res.send(profile));
        }

        return res.status(404).send({ errors: "Not found education." });
      })
      .catch(err => res.status(404).send(err));
  }
);

//@route  Post api/profile/experience
//@desc   Post experience of current user
//@access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(exp => exp.id)
          .indexOf(req.params.exp_id);
        //Splice out from array
        if (removeIndex !== -1) {
          profile.experience.splice(removeIndex, 1);
          //Save
          return profile.save().then(profile => res.send(profile));
        }

        return res.status(404).send({ errors: "Not found education." });
      })
      .catch(err => res.status(404).send(err));
  }
);

module.exports = router;
