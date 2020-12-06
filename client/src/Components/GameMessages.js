import React, {useEffect, useRef, useContext} from "react";
import API from "../utils/api";
import {bookApiContext} from '../context/bookApiContext';

function GameMessages(stfNthngs){
     const [books, setBooks] = useContext(bookApiContext);
     const messageRef = useRef();
     const messagesEndRef = useRef();
     function submitMessage(e){
          e.preventDefault();
          var text = messageRef.current.value.toLowerCase();
          console.log(text);
          text = parseMessage(text.split(` `));
          console.log(text);
          API.sendMessage({gameId:books[stfNthngs.bookIndex]._id,senderId:stfNthngs.userId,senderUsername:stfNthngs.username,text:text}).then(res=>{
               console.log(res);
               console.log(books[stfNthngs.bookIndex]._id);
               API.getMessages(books[stfNthngs.bookIndex]._id).then(res=>{
                    console.log(res);
                    stfNthngs.setMessages([...stfNthngs.messages,
                         {gameId:books[stfNthngs.bookIndex]._id,senderId:stfNthngs.userId,senderUsername:stfNthngs.username,text:text}
                    ]);
               }).catch(err=>{
                    console.log(err);
               });
          }).catch(err=>{
               console.log(err);
          });
          messageRef.current.value = "";
     }

     // useEffect(()=>{
     //      stfNthngs.setMessages(books[stfNthngs.bookIndex].messages);
     // }, [stfNthngs.bookIndex]);

     function capitalize(word){
          for(let i = 0; i < stfNthngs.capIsSpecial.length; i++){
               if(stfNthngs.capIsSpecial[i].name === word){
                    return stfNthngs.capIsSpecial[i].cap;
               }
          }
          word = word.split("_");
          let wordStore=[];
          let wordFragment;
          for(let i = 0; i < word.length; i++){
               wordFragment = word[i].split("");
               wordFragment[0] = wordFragment[0].toUpperCase();
               wordFragment = wordFragment.join("");
               wordStore.push(wordFragment);
          }
          return wordStore.join("_");
     }

     function parseMessage(array){
          let message = ``;
          message += `${capitalize(array[0])}`;
          for(let i = 1; i < array.length; i++){
               if(stfNthngs.party.length){
                    for(let j = 0; j < stfNthngs.party.length; j++){
                         switch(array[i]){
                              case stfNthngs.party[j]:
                                   console.log(`hi`);
                                   array[i] = capitalize(array[i]);
                                   break;
                              default:
                                   const checkForPunc = array[i-1].split("");
                                   if(checkForPunc[checkForPunc.length-1] === "." || checkForPunc[checkForPunc.length-1] === "!" || checkForPunc[checkForPunc.length-1] === "?"){
                                        array[i] = capitalize(array[i]);
                                   }
                         }
                    }
               }else{
                    const checkForPunc = array[i-1].split("");
                    if(checkForPunc[checkForPunc.length-1] === "." || checkForPunc[checkForPunc.length-1] === "!" || checkForPunc[checkForPunc.length-1] === "?"){
                         array[i] = capitalize(array[i]);
                    }
               }
               message += ` ${array[i]}`;
          }
          const checkForPunc = message.split("");
          if(checkForPunc[checkForPunc.length-1] !== "." && checkForPunc[checkForPunc.length-1] !== "!" && checkForPunc[checkForPunc.length-1] !== "?" ){
               message+=".";
          }

          return message;
     }

     useEffect(scrollToBottom, [stfNthngs.messages]);

     function scrollToBottom(){
          messagesEndRef.current.scrollIntoView({behavior:"smooth"});
     }

     return (
          <div className="scroll-container">
               <h1 className="scroll-heading">Message Scroll</h1>
               <div className="decree-scroll">
                    {stfNthngs.messages ? stfNthngs.messages.map((message, index)=>{
                         return(
                              <div key={index}>

                                   <div className="table rounded">
                                        {/* <div className="col-6"></div>
                                        <div className="col-6 table">
                                             <p className="text-align-right">{message.text}</p>
                                        </div> */}
                                        <p className="text-align-left">{message.senderUsername} ({stfNthngs.charName})</p>
                                        <div>
                                             {message.text}
                                        </div>
                                   </div>
                              </div>
                         )
                    }): <div></div>}
               <div ref={messagesEndRef}></div>
               </div>
               <form onSubmit={submitMessage}>
                    <input className="col-12 decree-box" name="DecreeBox" ref={messageRef} />
               </form>
          </div>
     );
}

export default GameMessages;