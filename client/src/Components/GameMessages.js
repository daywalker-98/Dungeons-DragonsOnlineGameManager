import React, {useEffect, useRef, useState} from "react";

function GameMessages(stfNthngs){
     const messageRef = useRef();
     const [messages, setMessages] = useState([]);
     function submitMessage(e){
          e.preventDefault();
          var message = {senderId:stfNthngs.userId,senderUsername:stfNthngs.username,text:messageRef.current.value};
          setMessages([...messages,
               message
          ]);
          messageRef.current.value = "";
     }

     return (
          <div className="scroll-container">
               <h1 className="scroll-heading">Message Scroll</h1>
               <div className="decree-scroll">
               {messages ? messages.map((message, index)=>{
                    if(index >= messages.length-30){
                         return(
                              <div key={index}>
                                   {(message.senderId == stfNthngs.userId) ? 
                                   <div className="row">
                                        <div className="col-6"></div>
                                        <div className="col-6 table">
                                             <p className="text-align-right">{message.text}</p>
                                        </div>
                                   </div> : 
                                   <div className="row">
                                        <div className="col-6">
                                             <p>{message.senderUsername} ({stfNthngs.charName})</p>
                                        </div>
                                        <div className="col-6">
                                             <p className="text-align-left">{message.text}</p>
                                        </div>
                                   </div>}
                              </div>
                         )
                         }else {
                         return null;
                    }
               }): <div></div>}
               </div>
               <form onSubmit={submitMessage}>
                    <input className="col-12 decree-box" name="DecreeBox" ref={messageRef} />
               </form>
          </div>
     );
}

export default GameMessages;