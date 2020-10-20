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

     saveBook: function(book, userId){
          return axios.put(`/api/dnd/books/:${userId}`, book);
     },

     getBook: function(_id){
          return axios.post(`/api/dnd/books/:${_id}`);
     },

     getBooks: function(){
          return axios.post
     }
}