import axios from "axios";

export default{
     getUser: function(loginData){
          return axios.get(`/api/users/logIn`, loginData);
     },

     newUser: function(userData){
          return axios.put(`/api/users/new-user`, userData);
     },

     setScreenName: function(screenName){
          return axios.post(`/api/users/${screenName}`);
     }
}