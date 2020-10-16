import React, {useRef} from "react";

function RenderAdventure(){
     const initiativeRef = useRef();
     function capitalize(word){
          word = word.split("");
          word[0] = word[0].toUpperCase();
          return word.join("");
     }
     function initiative(e){
          e.preventDefault();
          const initiativeAction = initiativeRef.current.value.toLowerCase();
          const actionArray = initiativeAction.split(" ");
          switch(actionArray[0]){
               case"pick up":
               
                    break;
               default:
                    break;
          }
     }
     return(
          <div className="container">
               <div className="row">
                    <img className="col-3" src="https://i.pinimg.com/736x/0e/d0/7d/0ed07dfab7dfeae5262bf0ba400b0ff6--dnd-characters-fantasy-characters.jpg" alt="Character art"/>
                    <form className="col-2" onSubmit={initiative} >
                         <input name="InitiativeBox" ref={initiativeRef} />
                    </form>
               </div>
          </div>
     );
}

export default RenderAdventure;