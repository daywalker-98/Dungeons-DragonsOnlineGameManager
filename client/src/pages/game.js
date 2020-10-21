import React, {useEffect, useRef, useState} from "react";
import RenderPlayer from "./playerContainer";
import RenderDungeon from "./DmGamePage";
import api from "../utils/api";
// import {useAuth0} from "@auth0/auth0-react";

function Game(stfNthngs){
     return(
          <div className="row">
               <div className="instructions scroll-container col-6">
                    <h1 className="scroll-heading">Instructions</h1>
                    <div className="scroll decree-scroll">
                         <h2>Basic gameplay</h2>
                              <p>To roll dice, recite "roll [insert # of dice]d[insert # of sides]"". If you wish to drop the highest or lowest value roled, append either "drop highest" or "drop lowest" to the previous incantation. To save the game, recite "save game [insert title]".</p>
                         <h2>Party System</h2>
                              <p>To add a member to your party, recite "Add player character: [insert character name]". To view all the members of your party, recite "Party members:". To add stats such as health, constitution, dexterity, etc., recite "Set [insert attribute (health/hp, strength/str, dexterity/dex, constitution/con, intelligence/int, wisdom/wis, or charisma/cha)] [insert player character] [insert desired stat value]". To view a specific characters stats, recite "[insert character] stats:". There is also an auto capitalization system for names, so if your character has an atypical capitalization style for their name, and you would like the game to use it, simply recite "[insert character name with desired capitalization style] has special capitalization]". If you set one by accident and would like to remove it, simply recite "[insert character] has not special capitalization".</p>
                         <h2>Saving and Loading</h2>
                              <p>All spaces in the title must be represented with underscores. To view all saved games, recite "Display games:". Lastly, to load a game, please recite "save game [insert title]". Again, all spaces in the title must be represented with underscores.</p>
                    </div>
               </div>
               <div className="col-6">
                    {stfNthngs.isDM ? <RenderDungeon userId={stfNthngs.userId}  userObj={stfNthngs.userObj} className="parchment"/> : <RenderPlayer className="parchment"/>}
               </div>
          </div>
     );
}

export default Game;