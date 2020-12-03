import axios from "axios";

export default{
     getUser: function(loginData){
          return axios.post(`/api/dnd/users/logIn`, loginData);
     },

     newUser: function(userData){
          return axios.put(`/api/dnd/users/new-user`, userData);
     },

     setScreenName: function(userId, screenName){
          return axios.put(`/api/dnd/users/${userId}`, screenName);
     },

     setGameCode: function(gameCode, id){
          return axios.post(`/api/dnd/books/gameCode`, {gameCode:gameCode,_id:id});
     },

     saveBook: function(book, id){
          return axios.post(`/api/dnd/books/save/:${id}`, book);
     },

     newBook: function(book){
          return axios.put(`/api/dnd/books/new`, book);
     },

     getBook: function(id, title){
          return axios.post(`/api/dnd/books/book/${id}/${title}`);
     },

     getBooks: function(id){
          return axios.get(`/api/dnd/books-by-user/${id}`);
     },

     deleteBook: function(id){
          return axios.delete(`/api/dnd/books/delete/${id}`);
     }
}