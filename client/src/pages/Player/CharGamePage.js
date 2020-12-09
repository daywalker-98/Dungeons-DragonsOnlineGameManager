import React, {useRef, useState, useContext, useEffect} from "react";
import API from "../../utils/api";
import {bookApiContext} from '../../context/bookApiContext';

function RenderAdventure(stfNthngs){
     const [books, setBooks] = useContext(bookApiContext);
     const [royalDecrees, setRoyalDecrees] = useState([]);
     const [NPCs, setNPCs] = useState([]);
     const initiativeRef = useRef();
     const decreesEndRef = useRef();

     useEffect(() =>{
          loadBook();
          setTimeout(() => {  
               window.scrollBy(0, -5);
          }, 1000);
     }, [books]);

     function loadBook(){
          if(books){
               console.log(books.title);
               console.log(stfNthngs.gameName);
               if(books.title == stfNthngs.gameName){
                    setTimeout(()=>{
                         setTimeout(console.log(`setBookIndex()`), 1000);
                         loadBookData();
                    }, 1000);
               }else{
                    console.log(`Failed to load book.`);
               }
          }else{
               console.log(`err`);
               console.log(books);
          }
     }

     function loadBookData(){
          // console.log(books[i]);
          if(books.royalDecrees){
               setRoyalDecrees(books.royalDecrees);
               setTimeout(()=>{
                    console.log(`royalDecrees set:`)
                    console.log(books.royalDecrees);
               }, 1000);
          } else {
               console.log(`No royalDecrees set.`);
               setRoyalDecrees([]);
          }
          if(books.NPCs){
               setNPCs(books.NPCs);
               setTimeout(()=>{
                    console.log(`NPCs set:`)
                    console.log(NPCs);
               }, 1000);
          } else {
               console.log(`No NPCs set.`);
               setNPCs([]);
          }
          if(books.party){
               stfNthngs.setParty(books.party);
               setTimeout(()=>{
                    console.log(`Party set:`);
                    console.log(stfNthngs.party);
               }, 1000);
          } else {
               console.log(`No party members set.`);
               stfNthngs.setParty([]);
          }
          if(books.messages){
               stfNthngs.setMessages(books.messages);
               setTimeout(() => {
                    console.log(`Messages sent:`);
                    console.log(stfNthngs.messages);
                    console.log(books.messages);
                    console.log(`Game loaded.`);
               }, 1000);
          } else {
               console.log(`No messages sent.`);
               stfNthngs.setMessages([]);
               console.log(`Game loaded.`);
          }
          setTimeout(() => {
               stfNthngs.retrieveMessages();
               retrieveMessages();
          }, 1000);
     }

     function retrieveMessages(i){
          setInterval(()=>{
               var gameId;
               var title;
               gameId = books._id;
               title = books.title;
               console.log(gameId);
               API.getMessages(gameId, title).then(res=>{
                    if(res.data.royalDecrees != royalDecrees){
                         setRoyalDecrees(res.data.royalDecrees);
                    } else {
                         console.log(res.data.royalDecrees);
                    }
               }).catch(err=>{
                    console.log(err);
               });
          },1000);
     }

     function saveNewBook(Book, title){
          API.newBook(Book, title).then(res=>{
               console.log(res);
               // setTimeout(loadBooks(), 1000);
          }).catch(err=>{
               console.log(err);
          });
     }

     function capitalize(word){
          word = word.split("");
          word[0] = word[0].toUpperCase();
          return word.join("");
     }
     function initiative(e){
          e.preventDefault();
          const initiativeAction = initiativeRef.current.value.toLowerCase();
          const actionArray = initiativeAction.split(" ");
          switch(actionArray[0]){
               case"pick":
                    switch(actionArray[1]){
                         case"up":
                              break;
                         default:
                    }
                    break;
               default:
          }
     }
     return(
          <div className="scroll-container">
               {/* <img className="col-3" src="https://i.pinimg.com/736x/0e/d0/7d/0ed07dfab7dfeae5262bf0ba400b0ff6--dnd-characters-fantasy-characters.jpg" alt="Character art"/> */}
               <h1 className="scroll-heading">Initiative Scroll</h1>
               <div className="decree-scroll">
                    {royalDecrees ? royalDecrees.map((decree, index)=>{
                         return(
                              <div key={index}>
                                   <br />
                                   <div className="table rounded">
                                        <p className="text-align-left">{decree.text}</p>
                                        {decree.value ? decree.value.map((value, subIndex)=>{
                                             return(
                                                  <div key={`${index}:${subIndex}`}>
                                                       {value}
                                                  </div>
                                             );
                                        }) : <p></p>}
                                   </div>
                              </div>
                         )
                    }): null}
                    <div ref={decreesEndRef}></div>
               </div>
               <form onSubmit={initiative}>
                    <input placeholder="Take initiative..." className="col-12 decree-box" name="InitiativeBox" ref={initiativeRef} />
               </form>
          </div>
     );
}

export default RenderAdventure;