import axios from "axios";

export function newUser(userId){
     return axios.post(`/api/users/new-user/${userId}`);
}

export function getUser(userId){
     return axios.get(`/api/users/login/${userId}`);
}

export function setScreenName(){
     return axios.post();
}