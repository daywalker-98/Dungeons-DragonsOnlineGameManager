import React, {useRef, useEffect, useState, useContext} from 'react';
import API from "../utils/api";
import {bookApiContext} from '../context/bookApiContext';

function MainMenu(stfNthngs){
     const [message, setMessage] = useState(`Choose a game mode`);
     const [gameCodeMessage, setGameCodeMessage] = useState()
     const [books, setBooks] = useContext(bookApiContext);
     // const [chars, setChars] = useState([]);
     const gameCodeBox = useRef();
     const gameNameBox = useRef();
     const charNameBox = useRef();
     
     useEffect(()=>{
          // console.log(`useEffect(): success; userId: ${stfNthngs.userId}`);
          retrieveBooks();
     },[]);

     function retrieveBooks(){
          API.getBooks(stfNthngs.userId).then(res=>{
               // console.log(`API.getBooks(): success (results below ▼)`);
               // console.log(res.data);
               setBooks(res.data);
          }).catch(err=>{
               console.log(`API.getBooks() inside useEffect in MainMenu: ${err}`);
          });
     }

     function saveNewBook(Book, title){
          API.newBook(Book, title).then(res=>{
               console.log(res);
               API.getBooks(stfNthngs.userId).then(res=>{
                    // console.log(`API.getBooks(): success (results below ▼)`);
                    // console.log(res.data);
                    setBooks(res.data);
               }).then(()=>{
                    setGame(gameNameBox.current.value, gameCodeBox.current.value, "Dungeon Master");
               }).catch(err=>{
                    console.log(`API.getBooks() inside useEffect in MainMenu: ${err}`);
               });
          }).catch(err=>{
               console.log(err);
          });
     }

     function setGame(gameName, gameCode, charName, id){
          if(gameCode && gameName){
               API.setGameCode(gameCode, id).then(res=>{
                    console.log(res);
                    stfNthngs.setGame(gameName, gameCode, charName);
                    stfNthngs.setGameState(true);
               }).catch(err=>{
                    console.log(err);
               });
          }else if(gameName){
               setMessage(`Please enter a game code.`);
               setGameCodeMessage(`Required field`);
               // messageTimeOut();
          }else if(gameCode){
               setMessage(`Please choose a game. If you would like to create a new game, enter the desired title below.`);
          }
     }

     return(
          <div>
               {message ?
               <div>
                    <p>{message}</p>
               </div> : <div><p></p></div>}
               {stfNthngs.isDM === true ?
               <div>
                    <button onClick={()=>{
                         stfNthngs.changeDM(false)
                         setMessage(`Choose a game mode`);
                         setGameCodeMessage(``);
                    }}>Back</button>
                    <div className="table">
                         <div>
                              <label>Enter Game Code: <span className="text-danger">{gameCodeMessage}</span></label>
                         </div>
                         <input ref={gameCodeBox}/>
                    </div>
                    <div>
                         <div>
                              {books ? <label>Set game:</label> : <div></div>}
                              {books ? books.map((book, index)=>{
                                   return (
                                   <div key={index}>
                                        <div className={book.title}>
                                             <button onClick={(e)=>{
                                                       e.preventDefault();
                                                       setGame(book.title, gameCodeBox.current.value, "Dungeon Master", book._id);
                                             }}>{book.title}</button>
                                             <button onClick={(e)=>{
                                                  e.preventDefault();
                                                  API.deleteBook(book._id).then(setTimeout(retrieveBooks(), 2000));
                                             }} >del</button>
                                        </div>
                                        <br />
                                   </div>);
                              }) : <p>No saved games. Create a new game to begin</p>}
                         </div>
                         <p>Start new game:</p>
                         <input ref={gameNameBox} />
                    </div>
                    <button onClick={()=>{
                         saveNewBook({id:stfNthngs.userId, title:gameNameBox.current.value, gameCode:gameCodeBox.current.value}, gameNameBox.current.value);
                    }}>Start</button>
               </div>
               : stfNthngs.isDM === "player" ?
               <div>
                    <button onClick={()=>{
                         stfNthngs.changeDM(false)
                         setMessage(`Choose a game mode`);
                    }}>Back</button>
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
                         <button onClick={()=>{
                              stfNthngs.changeDM(true)
                              setMessage(`Enter desired game settings.`);
                         }} >Start game as Dungeon Master</button>
                         <button onClick={()=>{
                              stfNthngs.changeDM("player")
                              setMessage(`Choose your character`);
                         }} >Start game as Party Member</button>
                    </div>
                    <div>
                         <p>Only the Dungeon Master mode is opperational at the moment. Do not click the player option.</p>
                    </div>
               </div>}
          </div>
     );
}

export default MainMenu;