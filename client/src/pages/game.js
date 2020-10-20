import React, {useEffect, useRef, useState} from "react";
import RenderPlayer from "./playerContainer";
import RenderDungeon from "./DmGamePage";
import api from "../utils/api";
// import {useAuth0} from "@auth0/auth0-react";

function Game(stfNthngs){
     const screenNameBox = useRef();
     function changeScreenName(e){
          e.preventDefault();
          api.setScreenName(stfNthngs.userId, {
               screenName: screenNameBox.current.value
          }).then(res=>{
               // console.log(res);
               screenNameBox.current.value = "";
          });
     }
     return(
          <div >
               <div >
                    {stfNthngs.isDM ? <RenderDungeon userId={stfNthngs.userId}  userObj={stfNthngs.userObj}className="parchment"/> : <RenderPlayer className="parchment"/>}
                    <form onSubmit={changeScreenName}>
                         <label htmlFor="usernameupdate">Change screenname here:</label>
                         <input className="col-4 decree-box" name="usernameupdate" ref={screenNameBox} />
                    </form>
               </div>
          </div>
     );
}

export default Game;