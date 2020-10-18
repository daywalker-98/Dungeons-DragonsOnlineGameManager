const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
     screenName: {
          type: String,
          trim: true,
          required: "Enter a screen name"
     },
     id:{
          type: String,
          trim: true,
          unique: true,
          required: "Enter your email"
     },
     date:{
          type: Date,
          default: Date.now
     }
});

const users = mongoose.model("users", usersSchema);

module.exports = users;