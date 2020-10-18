import React, {useEffect, useRef, useState} from "react";
import RenderPlayer from "./playerContainer";
import RenderDungeon from "./DmGamePage";
// import {useAuth0} from "@auth0/auth0-react";

function Game(stfNthngs){
     return(
          <div className="table">
               {stfNthngs.userObj ? <p>{stfNthngs.userObj.screenName}</p> : <p>{stfNthngs.userId}</p>}
               <div className="table">
                    {stfNthngs.isDM ? <RenderDungeon userId={stfNthngs.userId} userObj={stfNthngs.userObj}className="parchment"/> : <RenderPlayer className="parchment"/>}
               </div>
          </div>
     );
}

export default Game;