const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema({
     title:{
          type: String,
          trim: true,
          unique: true,
          required: "Enter a book title."
     },
     id:{
          type: String,
          required: true
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