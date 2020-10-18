const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema({
     title:{
          type: String,
          trim: true,
          required: "Enter a book title."
     },
     id:{
          type: String
     },
     id:{
          type: Number,
          trim: true,
          unique: true,
          default: Math.random()*99999999999
     },
     decreeHistory:{
          type: Object,
     },
     playerCharacters:{
          type: Object
     },
     npcs:{
          type: Object
     },
     capIsSpecial:{
          type: Object
     }
});

const books = mongoose.model("books", booksSchema);

module.exports = books;