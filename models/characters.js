const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const charactersSchema = new Schema({
     givenName: {
          type: String,
          trim: true,
          required: "Enter given name"
     },
     surname:{
          type: String,
          trim: true,
          required: false
     },
     title:{
          type: String,
          trim: true,
          required: false
     },
     id:{
          type: Number,
          trim: true,
          unique: true,
          default: Math.random()*99999999999
     },
     userId:{
          type: String
     },
     stats:{
          maxHealth: {
               type: Number,
               required: "Enter maxHealth stat."
          },
          STR: {
               type: Number,
               required: "Enter STR stat."
          },
          DEX: {
               type: Number,
               required: "Enter DEX stat."
          },
          CON: {
               type: Number,
               required: "Enter CON stat."
          },
          INT: {
               type: Number,
               required: "Enter INT stat."
          },
          WIS: {
               type: Number,
               required: "Enter WIS stat."
          },
          CHA: {
               type: Number,
               required: "Enter CHA stat."
          }
     }
});

const characters = mongoose.model("characters", charactersSchema);

module.exports = characters;