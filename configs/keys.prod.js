module.exports = {
  // mongoURI: "mongodb://localhost:27017/devconnectordb",
  mongoURI: process.env.MONGO_URL,
  secretKey: process.env.SECRET_KEY
};
