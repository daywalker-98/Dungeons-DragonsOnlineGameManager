import React, {useRef, useState} from "react";

function RenderDungeon(){
     const [royalDecrees, setRoyalDecrees] = useState([]);
     const [party, setParty] = useState(["tiffany","kurt","ass","assballs69","Heathcliff","ri'luaneth"]);
     const [NPCs, setNPCs] = useState([{"name":"reginald","isHostile":false},{"name":"general_zod","isHostile":true}]);
     const [capIsSpecial, setCapSpecial] = useState([{"name":"ri'luaneth","cap":"Ri'Luaneth"}]);
     const decreeRef = useRef();

     function capitalize(word){
          for(let i = 0; i < capIsSpecial.length; i++){
               if(capIsSpecial[i].name == word){
                    return capIsSpecial[i].cap;
               }
          }
          word = word.split("_");
          let wordStore=[];
          let wordFragment;
          for(let i = 0; i < word.length; i++){
               wordFragment = word[i].split("");
               wordFragment[0] = wordFragment[0].toUpperCase();
               wordFragment = wordFragment.join("");
               wordStore.push(wordFragment);
          }
          return wordStore.join("_");
     }
     
     function spellFailed(){
          const randomEvents = ["You've just turned a player into a toad.","Is... Is that a tiny rain cloud floating over your head...?","Oh.... now your hair is on fire...","RandomEvent4."];
          const length = randomEvents.length;
          const randomEvent = Math.round(Math.random()*length);
          const decreefailed = `${randomEvents[randomEvent]} You may need more practice. Please consult the spell book if you're having trouble.`;
          setRoyalDecrees([...royalDecrees,
               {
                    "text":decreefailed
               }]);
     }
     
     function submitDecree(e){
          e.preventDefault();
          const orignalDecree = decreeRef.current.value.split();
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
               case"add":
                    switch(decreeArray[1]){
                         case"player":
                              switch(decreeArray[2]){
                                   case"character":
                                        decreeArray[2] = `${decreeArray[2]}:`;
                                   case"character:":
                                        const newPlayer = decreeArray[3];
                                        if(party.includes(newPlayer)){
                                             const value = `${capitalize(newPlayer)} is already a member of your party.`;
                                             setRoyalDecrees([...royalDecrees,
                                                  {
                                                       "text":value
                                                  }
                                             ]);
                                        } else {
                                             switch(decreeArray[4]){
                                                  case"special":
                                                       switch(decreeArray[5]){
                                                            case"capitalize:":
                                                            case"capital:":
                                                            case"cap:":
                                                            case"cap":
                                                            case"capital":
                                                            case"capitalize":
                                                            case"capitalization":
                                                            case"capitalization:":
                                                                 setCapSpecial({"cap":orignalDecree[3],"name":decreeArray[3]});
                                                            default:
                                                       }
                                                  default:
                                             }
                                             const value = `New player character: ${capitalize(newPlayer)}`;
                                             setParty([...party,
                                                  {
                                                       "name":newPlayer
                                                  }
                                             ]);
                                             setRoyalDecrees([...royalDecrees,
                                                  {
                                                       "text":value
                                                  }
                                             ]);
                                        }
                                        break;
                                   default:
                                        spellFailed();
                              }
                              break;
                         case"npc":
                         case"npc:":
                              const newNPC = decreeArray[3];
                              if(NPCs.includes(newNPC)){
                                   const value = `${capitalize(newNPC)} is already a member of a non player character.`;
                                   setRoyalDecrees([...royalDecrees,
                                        {
                                             "text":value
                                        }
                                   ]);
                              }
                              const value = `New npc: ${newNPC}`;
                              setNPCs([...NPCs,
                                   {
                                        "name":capitalize(newNPC)
                                   }
                              ]);
                              setRoyalDecrees([...royalDecrees,
                                   {
                                        "text":value
                                   }
                              ]);
                              break;
                         default:
                              spellFailed();
                    }
                    break;
               case"remove":
               switch(decreeArray[1]){
                    case"player":
                         switch(decreeArray[2]){
                              case"character":
                              case"character:":
                                   const exitPlayer = decreeArray[3];
                                   if(party.includes(exitPlayer)){
                                        const index = party.indexOf(party);
                                        party.splice(index, 1);
                                        const value = `${capitalize(exitPlayer)} has left the party.`;
                                        setRoyalDecrees([...royalDecrees,
                                             {
                                                  "text":value
                                             }
                                        ]);
                                   } else {
                                        const value = `${capitalize(exitPlayer)} is not a member of the party`;
                                        setRoyalDecrees([...royalDecrees,
                                             {
                                                  "text":value
                                             }
                                        ]);
                                   }
                                   break;
                              default:
                                   spellFailed();
                         }
                         break;
                    case"npc":
                         decreeArray[1] = `${decreeArray[1]}:`
                    case"npc:":
                         const newNPC = decreeArray[3];
                         if(NPCs.includes(newNPC)){
                              const value = `${capitalize(newNPC)} is already a member of a non player character.`;
                              setRoyalDecrees([...royalDecrees,
                                   {
                                        "text":value
                                   }
                              ]);
                         }
                         const value = `New npc: ${newNPC}`;
                         setNPCs([...NPCs,
                              {
                                   "name":capitalize(newNPC)
                              }
                         ]);
                         setRoyalDecrees([...royalDecrees,
                              {
                                   "text":value
                              }
                         ]);
                         break;
                    default:
                         spellFailed();
                    }
                    break;
               case"party":
                    switch(decreeArray[1]){
                         case"members":
                         decreeArray[1] = `${decreeArray[1]}:`;
                         case"members:":
                              let value=`${capitalize(decreeArray[0])} ${decreeArray[1]} `;
                              for(let i = -1; i < party.length; i++){
                                   if(party[i] != null){
                                        if(i == party.length-1){
                                             value+=` and ${capitalize(party[i])}.`
                                        } else {
                                             value+=`${capitalize(party[i])}, `;
                                        }
                                   }
                              }
                              setRoyalDecrees([...royalDecrees,
                                   {
                                        "text":value
                                   }
                              ]);
                              break;
                         default:
                              spellFailed();
                    }
                    break;
               case"display":
                    switch(decreeArray[1]){
                         case"npc:":
                         case"npc":
                         case"npcs":
                         case"npcs:":
                              decreeArray[1] = `${decreeArray[1]} `;
                              let value=`${capitalize(decreeArray[1])}`;
                              if(NPCs.length == 2){
                                   value+=`${capitalize(NPCs[0].name)} and ${capitalize(NPCs[1].name)}.`
                              } else{
                                   for(let i = -1; i < NPCs.length; i++){
                                        if(NPCs[i] != null){
                                             if(i == NPCs.length-1){
                                                  value+=` and ${capitalize(NPCs[i].name)}.`
                                                  console.log(NPCs[i]);
                                             } else {
                                                  value+=`${capitalize(NPCs[i].name)}, `;
                                             }
                                        }
                                   }
                              }
                              setRoyalDecrees([...royalDecrees,
                                   {
                                        "text":value
                                   }
                              ]);
                              break;
                         default:
                    }
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
                              spellFailed();
                         }
                         if(result){
                              setRoyalDecrees([...royalDecrees,
                                   {
                                        "text":result
                                   }
                              ])
                         }
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
                    ]);
                    break;
               case"action":
               case"action:":
                    let subject;
                    for(let i = 0; i < party.length; i++){
                         if(decreeArray[1] === party[i]){
                              subject = party[i];
                         }
                    }
                    if(subject){
                         switch(decreeArray[2]){
                              case"attack":
                              case"attacks":
                              case"attacked":
                                   setRoyalDecrees([...royalDecrees,
                                   {
                                        "text":`${capitalize(subject)} attacked ` + "${capitalize(object)}"
                                   }]);
                                   break;

                         }
                    }
                    else{
                         setRoyalDecrees([...royalDecrees,
                         {
                              "text": `${capitalize(decreeArray[1])} is not a player`
                         }]);
                    }
                    break;
               default:
                    if(party.includes(decreeArray[0])){
                         switch(decreeArray[1]){
                              case"is":
                                   switch(decreeArray[2]){
                                        case"poisoned":
                                        case"poisoned.":
                                             break;
                                        default:
                                             spellFailed();
                                   }
                                   break;
                              case"has":
                                   switch(decreeArray[2]){
                                        case"special":
                                             switch(decreeArray[3]){
                                                  case"capitalization":
                                                  case"capitalisation":
                                                  case"capitalization.":
                                                  case"capitalisation.":
                                                       setCapSpecial([...capIsSpecial,
                                                            {
                                                                 "name":decreeArray[0],
                                                                 "cap":orignalDecree[0]
                                                            }]);
                                                       break;
                                                  default:
                                                  }
                                             break;
                                        case"not":
                                             switch(decreeArray[3]){
                                                  case"special":
                                                       switch(decreeArray[4]){
                                                            case"capitalization":
                                                            case"capitalisation":
                                                            case"capitalization.":
                                                            case"capitalisation.":
                                                                 let index;
                                                                 for(let i = 0; i < capIsSpecial.length; i++){
                                                                      if(capIsSpecial[i].name == decreeArray[0]){
                                                                           index = i;
                                                                      }
                                                                 }
                                                                 if(index){
                                                                      capIsSpecial.splice(index);
                                                                 } else {
                                                                      let value = `${capitalize(decreeArray[0])} has not special capitalization. Were you attempting to set a special capitalization scheme for ${capitalize(decreeArray[0])}?`;
                                                                      setRoyalDecrees([...royalDecrees,
                                                                           {
                                                                                "text":value
                                                                           }]);
                                                                 }
                                                                 break;
                                                            default:
                                                                 spellFailed();          
                                                       }
                                                       break;
                                                  default:
                                                       spellFailed();
                                                  }
                                             break;
                                        default:
                                             spellFailed();
                                   }
                                   break;
                              default:
                                   spellFailed();
                         }
                    } else {
                         spellFailed();
                    }
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