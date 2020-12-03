const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema({
     title:{
          type: String,
          trim: true,
          required: true
     },
     id:{
          type: String,
          required: true
     },
     gameCode:{
          type: String,
          trim: true
          // unique: true,
     },
     royalDecrees:{
          type: Object,
     },
     party:{
          type: Object
     },
     NPCs:{
          type: Object
     },
     capIsSpecial:{
          type: Object
     }
});

const books = mongoose.model("books", booksSchema);

module.exports = books;