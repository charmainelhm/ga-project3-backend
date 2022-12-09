// Import dependencies
const mongoose = require("mongoose");
const User = require("./user"); // import user schema

const mongoURI = process.env.MONGO_URL + process.env.MONGO_DB;
const db = mongoose.connection;

//Connect
mongoose.connect(mongoURI, () => {
  console.log("Connection to Mongo DB established");
});

//Helpful events
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

module.exports = {
  User,
};
