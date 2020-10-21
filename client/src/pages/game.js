import React, {useEffect, useRef, useState} from "react";
import RenderPlayer from "./playerContainer";
import RenderDungeon from "./DmGamePage";
import api from "../utils/api";
// import {useAuth0} from "@auth0/auth0-react";

function Game(stfNthngs){
     return(
          <div >
               {stfNthngs.isDM ? <RenderDungeon userId={stfNthngs.userId}  userObj={stfNthngs.userObj} className="parchment"/> : <RenderPlayer className="parchment"/>}
          </div>
     );
}

export default Game;