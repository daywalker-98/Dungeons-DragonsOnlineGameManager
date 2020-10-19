const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
     screenName: {
          type: String,
          required: true
     },
     id:{
          type: String,
          unique: true,
          required: true
     },
     date:{
          type: Date,
          default: Date.now
     }
});

const users = mongoose.model("users", usersSchema);

module.exports = users;