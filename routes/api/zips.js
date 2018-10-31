const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load User Model
const Zip = require("../../models/Zip");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const options = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      sort: req.query.sort || { city: "asc" }
    };

    //   Zip.find()
    //     .skip(page * limit)
    //     .limit(limit)
    //     .exec((err, doc) => {
    //       if (err) return res.status(500).json(err);
    //       return res.json(doc);
    //     });
    Zip.paginate({}, options, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json(result);
    });
  }
);

module.exports = router;
