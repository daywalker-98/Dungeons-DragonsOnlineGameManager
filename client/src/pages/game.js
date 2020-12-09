import React, {useEffect, useRef, useState, useContext} from "react";
import RenderPlayer from "./Player/CharGamePage";
import RenderDungeon from "./DmGamePage";
import GameInstructions from "../Components/GameInstructions";
import GameMessages from "../Components/GameMessages";
import API from "../utils/api";
import {bookApiContext} from '../context/bookApiContext';
// import {useAuth0} from "@auth0/auth0-react";

function Game(stfNthngs){
     const [books, setBooks] = useContext(bookApiContext);
     const [party, setParty] = useState([]);
     const [bookIndex, setBookIndex] = useState();
     const [capIsSpecial, setCapSpecial] = useState([]);
     const [messages, setMessages] = useState([]);

     function retrieveMessages(i){
          setInterval(()=>{
               var gameId;
               var title;
               if(stfNthngs.isDM == "player"){
                    gameId = books._id;
                    title = books.title;
                    console.log(gameId);
               } else if(stfNthngs.isDM == true){
                    gameId = books[i]._id;
                    title = books[i].title
                    console.log(gameId);
               }
               API.getMessages(gameId, title).then(res=>{
                    if(res.data.messages != messages){
                         setMessages(res.data.messages);
                    } else {
                         console.log(res.data.messages);
                    }
               }).catch(err=>{
                    console.log(err);
               });
          },1000);
     }
     
     return(
          <div>
          <div className="row">
               <div className="col-12">
                    <h2>{stfNthngs.charName}</h2>
               </div>
          </div>
          <div className="row">
               <div className="col-md-4 col-sm-12">
                    <GameInstructions />
               </div>
               <div className="col-md-4 col-sm-12">
                    {stfNthngs.isDM === true ? <RenderDungeon bookIndex={bookIndex} setBookIndex={(v)=>{setBookIndex(v)}} setGameName={(v)=>stfNthngs.setGameName(v)} gameName={stfNthngs.gameName} gameCode={stfNthngs.gameCode} userId={stfNthngs.userId} userObj={stfNthngs.userObj} party={party} setParty={(v)=>setParty(v)} capIsSpecial={capIsSpecial} setCapSpecial={(v)=>setCapSpecial(v)} setMessages={(v)=>setMessages(v)} retrieveMessages={retrieveMessages} className="parchment"/>
                    :
                    stfNthngs.isDM === "player" ? <RenderPlayer bookIndex={bookIndex} setBookIndex={(v)=>{setBookIndex(v)}} setGameName={(v)=>stfNthngs.setGameName(v)} userId={stfNthngs.userId} gameName={stfNthngs.gameName} gameCode={stfNthngs.gameCode} userObj={stfNthngs.userObj} setParty={(v)=>setParty(v)} capIsSpecial={capIsSpecial} setMessages={(v)=>setMessages(v)} retrieveMessages={retrieveMessages} charName={stfNthngs.charName} className="parchment"/> : <div>Something went wrong. Please reload the site and rejoin the game. If this error persists, notify us at dribbleGribble0516@gmail.com.</div>}
               </div>
               <div className="col-md-4 col-sm-12">
                    <GameMessages messages={messages} setMessages={(v)=>setMessages(v)} bookIndex={bookIndex} isDM={stfNthngs.isDM} party={party} capIsSpecial={capIsSpecial} charName={stfNthngs.charName} username={stfNthngs.username} userId={stfNthngs.userId}/>
               </div>
          </div>
          </div>
     );
}

export default Game;