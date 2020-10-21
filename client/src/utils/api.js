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

     saveBook: function(book){
          return axios.post(`/api/dnd/books/save`, book);
     },

     newBook: function(book){
          return axios.put(`/api/dnd/books/save`, book);
     },

     getBook: function(title){
          return axios.post(`/api/dnd/books/book/${title}`);
     },

     getBooks: function(id){
          return axios.get(`/api/dnd/books-by-user/${id}`);
     }
}