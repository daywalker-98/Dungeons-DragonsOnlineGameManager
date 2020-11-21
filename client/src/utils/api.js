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

     saveBook: function(book, title){
          return axios.post(`/api/dnd/books/save${title}`, book);
     },

     newBook: function(book){
          return axios.put(`/api/dnd/books/new`, book);
     },

     getBook: function(id, title){
          return axios.post(`/api/dnd/books/book/${id}/${title}`);
     },

     getBooks: function(id){
          return axios.get(`/api/dnd/books-by-user/${id}`);
     }
}