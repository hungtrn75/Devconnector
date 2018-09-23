const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./configs/keys").mongoURI;
const options = {
  useNewUrlParser: true
};
console.log(db);

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
