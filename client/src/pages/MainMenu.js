import React, {useRef, useEffect, useState, useContext} from 'react';
import API from "../utils/api";
import {bookApiContext} from '../context/bookApiContext';

function MainMenu(stfNthngs){
     const [books, setBooks] = useContext(bookApiContext);
     // const [chars, setChars] = useState([]);
     const gameCodeBox = useRef();
     const gameNameBox = useRef();
     const charNameBox = useRef();
     
     useEffect(()=>{
          console.log(`useEffect(): success; userId: ${stfNthngs.userId}`);
          retrieveBooks();
     },[]);

     function retrieveBooks(){
          API.getBooks(stfNthngs.userId).then(res=>{
               console.log(`API.getBooks(): success (results below ▼)`);
               console.log(res.data);
               setBooks(res.data);
          }).catch(err=>{
               console.log(`API.getBooks() inside useEffect in MainMenu: ${err}`);
          });
     }

     function setGame(gameName, gameCode, charName){
          stfNthngs.setGame(gameName, gameCode, charName);
          stfNthngs.setGameState(true);
     }

     return(
          <div>
               {stfNthngs.isDM === true ?
               <div>
                    <button onClick={()=>stfNthngs.changeDM(false)}>Back</button>
                    <div className="table">
                         <div>
                              <label>Enter Game Code:</label>
                         </div>
                         <input ref={gameCodeBox}/>
                    </div>
                    <div>
                         <div>
                              <label>Set game:</label>
                              {books ? books.map((book, index)=>{
                                   return (
                                   <div key={index}>
                                        <div className={book.title}>
                                             <button onClick={(e)=>{
                                                       e.preventDefault();
                                                       setGame(book.title, gameCodeBox.current.value, "Dungeon Master", book);
                                             }}>{book.title}</button>
                                             <button onClick={(e)=>{
                                                  e.preventDefault();
                                                  API.deleteBook(book._id);
                                                  retrieveBooks();
                                             }} >del</button>
                                        </div>
                                        <br />
                                   </div>);
                              }) : <p>No saved games. Create a new game to begin</p>}
                         </div>
                         <p>Start new game:</p>
                         <input ref={gameNameBox} />
                    </div>
                    <button onClick={()=>setGame(gameNameBox.current.value, gameCodeBox.current.value, "Dungeon Master", {})}>Start</button>
               </div>
               : stfNthngs.isDM === "player" ?
               <div>
                    <button onClick={()=>stfNthngs.changeDM(false)}>Back</button>
                    <form className="table" onSubmit={()=>setGame()}>
                         <div>
                              <div>
                                   <label>Enter Game Code:</label>
                              </div>
                              <input ref={gameCodeBox}/>
                         </div>
                         <div>
                              <div>
                                   <label>Set game name:</label>
                              </div>
                              <input ref={gameNameBox}/>
                         </div>
                         <div>
                              <div>
                                   <label>Choose your character:</label>
                                   <input ref={charNameBox}/>
                              </div>
                         </div>
                    </form>
                    <button onClick={()=>setGame(gameNameBox.current.value, gameCodeBox.current.value, charNameBox.current.value)}>Start game</button>
               </div>
               :
               <div>
                    <div>
                         <button onClick={()=>stfNthngs.changeDM(true)} >Start game as Dungeon Master</button>
                         <button onClick={()=>stfNthngs.changeDM("player")} >Start game as Party Member</button>
                    </div>
                    <div>
                         <p>Only the Dungeon Master mode is opperational at the moment. Do not click the player option.</p>
                    </div>
               </div>}
          </div>
     );
}

export default MainMenu;