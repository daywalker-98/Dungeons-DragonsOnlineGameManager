import React from 'react';

function GameInstructions(){
     return(
          <div className="instructions scroll-container col-12">
               <h1 className="scroll-heading">Instructions</h1>
               <div className="scroll decree-scroll">
                    <h2>Basic gameplay</h2>
                         <p>To roll dice, recite "roll [insert # of dice]d[insert # of sides]". If you wish to drop the highest or lowest value roled, append either "drop highest" or "drop lowest" to the previous incantation. To save the game, recite "save game [insert title]".</p>
                    <h2>Party System</h2>
                         <p>To add a member to your party, recite "Add player character: [insert character name]". To view all the members of your party, recite "Party members:". To add stats such as health, constitution, dexterity, etc., recite "Set [insert attribute (health/hp, strength/str, dexterity/dex, constitution/con, intelligence/int, wisdom/wis, or charisma/cha)] [insert player character] [insert desired stat value]". To view a specific characters stats, recite "[insert character] stats:". There is also an auto capitalization system for names, so if your character has an atypical capitalization style for their name, and you would like the game to use it, simply recite "[insert character name with desired capitalization style] has special capitalization]". If you set one by accident and would like to remove it, simply recite "[insert character] has not special capitalization".</p>
                    <h2>Saving and Loading</h2>
                         <p>All spaces in the title must be represented with underscores. To view all saved games, recite "Display games:". Lastly, to save a game, please recite "save game [(optional)insert title]" (title will default to the currently loaded game's title) and to load a game chant "load game [insert title]". Again, all spaces in the title must be represented with underscores.</p>
               </div>
          </div>               
     );
}

export default GameInstructions;