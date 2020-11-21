import React, {useEffect, useRef, useState} from "react";
import RenderPlayer from "./playerContainer";
import RenderDungeon from "./DmGamePage";
import GameInstructions from "../Components/GameInstructions";
import GameMessages from "../Components/GameMessages";
// import {useAuth0} from "@auth0/auth0-react";

function Game(stfNthngs){
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
                    {stfNthngs.isDM === true ? <RenderDungeon setGameName={(v)=>stfNthngs.setGameName(v)} gameName={stfNthngs.gameName} userId={stfNthngs.userId}  userObj={stfNthngs.userObj} className="parchment"/> : stfNthngs.isDM === "player" ? <RenderPlayer userId={stfNthngs.userId} userObj={stfNthngs.userObj} charName={stfNthngs.charName} className="parchment"/> : <div>Something went wrong. Please reload the site and rejoin the game. If this error persists, notify us at dribbleGribble0516@gmail.com.</div>}
               </div>
               <div className="col-md-4 col-sm-12">
                    <GameMessages charName={stfNthngs.charName} username={stfNthngs.username} userId={stfNthngs.userId}/>
               </div>
          </div>
          </div>
     );
}

export default Game;