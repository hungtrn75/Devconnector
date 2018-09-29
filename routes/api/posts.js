const express = require("express");
const router = express.Router();
const passport = require("passport");

//Post model
const Post = require("../../models/Post");
//Validation
const validatePostInput = require("../../validation/posts/posts");
const validateCommentInput = require("../../validation/posts/comment");

//@route  GET api/posts/test
//@desc   Test post route
//@access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Posts works"
  });
});

//@route  Post api/posts
//@desc   Post route
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      user: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar
    });
    newPost.save().then(post => res.send(post));
  }
);

//@route  GET api/posts/test
//@desc   GET post current user route
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(post => {
        res.send(post);
      })
      .catch(err => res.status(404).send({ errors: "Not found" }));
  }
);

//@route  GET api/posts/test
//@desc   GET post with ID route
//@access Private
router.get(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .populate("comments.user", ["name", "avatar"])
      .then(post => {
        if (post) return res.send(post);
        else throw new Error();
      })
      .catch(err => res.status(404).send({ errors: "Not found" }));
  }
);

//@route  DELETE api/posts/test
//@desc   DELETE post with ID route
//@access Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOneAndDelete({ user: req.user.id, _id: req.params.post_id })
      .then(post => {
        if (!post)
          return res.status(404).send({ errors: "This post is not found." });
        return res.send({ success: "Delete this post successful." });
      })
      .catch(err => res.status(404).send({ errors: "Can't delete this post" }));
  }
);

//@route  GET api/posts/like/:post_id
//@desc   Like post with ID route
//@access Private
router.get(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      let errors = {};
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        errors.like = "You already liked this post.";
        return res.status(400).send(errors);
      }

      //Add user_id to like array
      post.likes.unshift({ user: req.user.id });
      post.save().then(post => res.send(post));
    });
  }
);

//@route  GET api/posts/like/:post_id
//@desc   Unlike post with ID route
//@access Private
router.get(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .send({ errors: "You have not yet liked this post." });
        }

        //Find index user liked
        const unlikeIndex = post.likes
          .map(like => like.user.toString())
          .indexOf(req.user.id);
        //Splice out from likes array
        post.likes.splice(unlikeIndex, 1);
        post.save().then(post => res.send(post));
      })
      .catch(err => res.status(404).send({ errors: "No post found" }));
  }
);

//@route  POST api/posts/comment/:post_id
//@desc   Comment to post
//@access Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      return res.status(404).send(errors);
    }
    Post.findById(req.params.post_id)
      .populate("comments.user", ["name", "avatar"])
      .then(post => {
        //New comment
        const newComment = {
          text: req.body.text,
          user: req.user.id
        };

        // return res.send(post);
        //Add user_id to like array
        post.comments.unshift(newComment);
        post.save().then(post => res.send(post));
      })
      .catch(err => res.status(404).send({ errors: "No post found" }));
  }
);

//@route  DELETE api/posts/comment/:post_id
//@desc   DELETE comment to post
//@access Private
router.delete(
  "/:post_id/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        //Check role user
        if (post.user.toString() !== req.user.id) {
          return res
            .status(404)
            .send({ errors: "You can not delete this comment" });
        }

        //Check comment exist
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).send({ errors: "Comment does not exist." });
        }
        //Get remove index
        const removeIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);
        //Splice out from comments array
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.send(post));
      })
      .catch(err => res.status(404).send({ errors: "No post found" }));
  }
);
module.exports = router;
