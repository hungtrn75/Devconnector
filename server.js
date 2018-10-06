const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./configs/keys").mongoURI;
const options = {
  useNewUrlParser: true
};

//Connect to MongoDB
mongoose
  .connect(
    db,
    options
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport configs
require("./configs/passport")(passport);

//Use Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//server static assets if it's production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client-refactor/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client-refactor", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
