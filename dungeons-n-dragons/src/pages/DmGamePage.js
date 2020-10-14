import React, {useRef, useState} from "react";

function RenderDungeon(){
     const [royalDecrees, setRoyalDecrees] = useState([]);
     const decreeRef = useRef();
     function capitalize(word){
          word = word.split("");
          word[0] = word[0].toUpperCase();
          return word.join("");
     }
     function spellFailed(){
          const randomEvents = ["You've just turned a player into a toad.","Is... Is that a tiny rain cloud floating over your head...?","Oh.... now your hair is on fire...","RandomEvent4."];
          const length = randomEvents.length;
          const randomEvent = Math.round(Math.random()*length);
          return`${randomEvents[randomEvent]} You may need more practice. Please consult the spell book if you're having trouble.`;
     }
     function submitDecree(e){
          e.preventDefault();
          const decreeTemp = decreeRef.current.value.toLowerCase();
          const decreeArray = decreeTemp.split(" ");
          switch(decreeArray[0]){
               case"roll":
                    const dice = decreeArray[1].split("d");
                    const numOfDice = dice[0]
                    const numOfSides = dice[1];
                    let dieRollArray=[];
                    let sum=0;
                    const rollRam = [];
                    for(let i = numOfDice; i--; i > 0)
                    {
                         var random = Math.floor((Math.random() * numOfSides) + 1);
                         rollRam.push(random);
                         dieRollArray.push(`d${numOfSides}: ${random}`);
                         sum+=parseInt(random);
                    }
                    if(decreeArray[2] === "drop"){
                         let dropped;
                         switch(decreeArray[3]){
                              case "lowest":
                                   let lowest = sum;
                                   for(let i = 0; i < rollRam.length; i++){
                                        if(rollRam[i] < lowest){
                                             lowest = rollRam[i];
                                        }
                                   }
                                   console.log(lowest, dieRollArray);
                                   dropped = dieRollArray.indexOf(`d${numOfSides}: ${lowest}`);
                                   sum = sum - lowest;
                                   break;
                              case "highest":
                                   let highest = 0;
                                   for(let i = 0; i < rollRam.length; i++){
                                        if(rollRam[i] > highest){
                                             highest = rollRam[i];
                                        }
                                   }
                                   dropped = dieRollArray.indexOf(`d${numOfSides}: ${highest}`);
                                   sum = sum - highest;
                                   break;
                              default:
                                   break;
                         }
                         dieRollArray[dropped] = `${dieRollArray[dropped]} (dropped)`;
                    }
                    dieRollArray.push(`sum: ${sum}`);
                    const value = dieRollArray;
                    setRoyalDecrees([...royalDecrees,
                         {
                              "text": decreeRef.current.value,
                              "value":value
                         }
                    ])
                    break;
               case"abucus":
               case"calculate":
                    var result;
                    var equation;
                    var firstNum;
                    var calculus;
                    var secNum;
                    if(decreeArray[1]){
                         equation = decreeArray[1].split("");
                         firstNum = parseInt(equation[0]);
                         calculus = equation[1];
                         secNum = parseInt(equation[2]);
                    }
                    switch(calculus){
                         case"+":
                         case"plus":
                              result = parseInt(firstNum+secNum);
                              break;
                         case"-":
                         case"minus":
                              result = parseInt(firstNum-secNum);
                              break;
                         case"*":
                         case"x":
                         case"multiplied by":
                              result = parseInt(firstNum*secNum);
                              break;
                         default:
                              result = spellFailed();
                         }
                         setRoyalDecrees([...royalDecrees,
                              {
                                   "text":result
                              }
                         ])
                    break;
               case"banana":
                    var name = decreeArray[1];
                    name = capitalize(name);
                    setRoyalDecrees([...royalDecrees,
                         {
                              "text":`${name} is bananas!`
                         }
                    ]);
                    break;
               case"troglodyte":
                    var name = decreeArray[1];
                    name = capitalize(name);
                    setRoyalDecrees([...royalDecrees,
                         {
                              "text":`${name} is an uneducated troglodyte.`
                         }
                    ])
                    break;
               default:
                    const decreeFailed = spellFailed();
                    setRoyalDecrees([...royalDecrees,
                         {
                              "text": decreeFailed
                         }
                    ]);
          }
          // saveData(royalDecrees[royalDecrees.length]);
          decreeRef.current.value = "";
     };
     return(
          <div className="scroll-container">
               <h1 className="scroll-heading">Decree Scroll</h1>
               <div className="decree-scroll">
                    {royalDecrees.map((decree, index)=>{
                    if(index >= royalDecrees.length-5)
                         return(
                              <div key={index}>
                                   <p className="text-align-left">{decree.text}</p>
                                   {decree.value ? decree.value.map((value)=>{
                                        return(
                                             <div>
                                                  {value}
                                             </div>
                                        );
                                   }) : <p></p>}
                              </div>
                         )
                         else return null;
                    })}
               </div>
          <form onSubmit={submitDecree}>
               <input className="col-12 decree-box" name="DecreeBox" ref={decreeRef} />
          </form>
          </div>
     );
}

export default RenderDungeon;