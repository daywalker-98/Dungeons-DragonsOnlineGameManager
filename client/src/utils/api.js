import axios from "axios";

export function getCharacters(userId){
     return axios.get(`/api/char/chars/${userId}`);
}

export function deleteCharacter(charId){
     return axios.delete(`/api/char/chars/${charId}`);
}

export function createCharacter(char){
     return axios.post(`api/char/create-char`, char);
}

export function pushBook(Book){
     return axios.post(``, Book);
}