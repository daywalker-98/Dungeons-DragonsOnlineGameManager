import React, {useEffect, useRef, useState} from "react";
import RenderPlayer from "./playerContainer";
import RenderDungeon from "./DmGamePage";
import {useAuth0} from "@auth0/auth0-react";
// import LogIn from "./pages/logIn";

function Game(stfNthngs){
     return(
          <div className="table">
               <p>{stfNthngs.user.name}</p>
               <div className="table">
                    {stfNthngs.isDM ? <RenderDungeon className="parchment"/> : <RenderPlayer className="parchnment"/>}
               </div>
          </div>
     );
}

export default Game;