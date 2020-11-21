import React, {useRef, useEffect, useState} from 'react';
import API from "../utils/api";

function MainMenu(stfNthngs){
     // const [chars, setChars] = useState([]);
     const gameCodeBox = useRef();
     const gameNameBox = useRef();
     const charNameBox = useRef();
     
     useEffect(()=>{
          console.log(`useEffect(): success; userId: ${stfNthngs.userId}`);
          API.getBooks(stfNthngs.userId).then(res=>{
               console.log(`API.getBooks(): success (results below ▼)`);
               stfNthngs.setPlayerBooks(res.data);
               // const books = res.data;
               // console.log(books[0].title);
               // console.log(books[1].title);
               // let text = [{text:`Books:`}];
               // for(let i = -1; i < books.length; i++){
               //      if(books[i]){
               //           text = [...text, {text : `Title: ${books[i].title}`}];
               //           if(books[i].royalDecrees){
               //                text = [...text, {text : `Entries: ${books[i].royalDecrees.length}`}];
               //           } else {
               //                text = [...text, {text : `Entries: 0`}];
               //           }
               //      } else {
               //           text = [...text, {text : `-<>- -|> -|- <|- -<>-`}];
               //      }
               // }
          }).catch(err=>{
               console.log(`API.getBooks() inside useEffect in MainMenu: ${err}`);
          });
     },[]);

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
                              {stfNthngs.books ? stfNthngs.books.map((book, index)=>{
                                   return (
                                   <div key={index}>
                                        <div className={book.title}>
                                             <button onClick={(e)=>{
                                                       e.preventDefault();
                                                       setGame(book.title, gameCodeBox.current.value, "Dungeon Master");
                                             }}>{book.title}</button>
                                             <button>del</button>
                                        </div>
                                        <br />
                                   </div>);
                              }) : <p>No saved games. Create a new game to begin</p>}
                         </div>
                         <p>Start new game:</p>
                         <input ref={gameNameBox} />
                    </div>
                    <button onClick={()=>setGame(gameNameBox.current.value, gameCodeBox.current.value, "Dungeon Master")}>Start</button>
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