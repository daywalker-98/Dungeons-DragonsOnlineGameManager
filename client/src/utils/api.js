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

     getGameByGameCode: function(gameCode, title){
          return axios.get(`/api/dnd/books/getGameByCode/${gameCode}/${title}`);
     },

     saveBook: function(book, id){
          return axios.post(`/api/dnd/books/save/:${id}`, book);
     },

     newBook: function(book){
          return axios.post(`/api/dnd/books/new`, book);
     },

     getBook: function(id, title){
          return axios.post(`/api/dnd/books/book/${id}/${title}`);
     },

     getBooks: function(id){
          return axios.get(`/api/dnd/books-by-user/${id}`);
     },

     deleteBook: function(id){
          return axios.delete(`/api/dnd/books/delete/${id}`);
     },

     sendMessage: function(message){
          return axios.post(`api/dnd/messages/send`, message);
     },

     getMessages: function(id){
          return axios.get(`api/dnd/messages/get`, {_id:id});
     }
}