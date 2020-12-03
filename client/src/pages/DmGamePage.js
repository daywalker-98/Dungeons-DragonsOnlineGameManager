import React, {useRef, useEffect, useState, useContext} from "react";
// import { books } from "../../../models";
import API from "../utils/api";
import {bookApiContext} from '../context/bookApiContext';

function RenderDungeon(stfNthngs){
     const [books, setBooks] = useContext(bookApiContext);
     const [bookIndex, setBookIndex] = useState();
     const [royalDecrees, setRoyalDecrees] = useState([]);
     const [party, setParty] = useState([]);
     const [NPCs, setNPCs] = useState([]);
     const [capIsSpecial, setCapSpecial] = useState([]);
     const decreeRef = useRef();
     const decreesEndRef = useRef();



     useEffect(() => {
          API.getBooks(stfNthngs.userId).then(res=>{
               console.log(`API.getBooks(): success (results below ▼)`);
               console.log(res.data);
               setBooks(res.data);
               console.log(`Loading book: ${stfNthngs.gameName}`);
               let i = 0;
               function loadBook(i){
                    if(books[i].title == stfNthngs.gameName){
                         setTimeout(console.log(i), 1000);
                         console.log(books);
                         console.log(books[i]);
                         setTimeout(()=>{
                              if(books){
                                   setBookIndex(i);
                                   loadBookData(i);
                                   // setInterval(setRoyalDecrees(books[stfNthngs.gameName].royalDecrees),1000);
                              } else {
                                   console.log(`Failed to load books.`);
                                   saveNewBook({id:stfNthngs.userId, title:stfNthngs.gameName}, stfNthngs.gameName);
                                   setBooks();
                              }
                         }, 1000);
                    } else {
                         if(i < books.length){
                              i++;
                              console.log(i);
                              loadBook(i);
                         } else {
                              console.log(`Failed to load book.`);
                         }
                    }
                    API.setGameCode(stfNthngs.gameCode, books[bookIndex]._id).then(res=>{
                         console.log(res);
                    }).catch(err=>{
                         console.log(err);
                    });
               }
               loadBook(i);
          }).catch(err=>{
               console.log(`API.getBooks() inside useEffect in DmGamePage: ${err}`);
          });
     }, [books]);

     useEffect(scrollToBottom, [royalDecrees]);

     function scrollToBottom(){
          decreesEndRef.current.scrollIntoView({behavior:"smooth"});
     }

     function capitalize(word){
          for(let i = 0; i < capIsSpecial.length; i++){
               if(capIsSpecial[i].name === word){
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

     function loadBookData(i){
          if(books[i].royalDecrees){
               setRoyalDecrees(books[i].royalDecrees);
               setTimeout(console.log(`royalDecrees set: ${console.log(royalDecrees)}`), 1000);
          } else {
               console.log(`No royalDecrees set.`);
               setRoyalDecrees([]);
          }
          if(books[i].NPCs){
               setNPCs(books[i].NPCs);
               setTimeout(console.log(`NPCs set: ${NPCs}`), 1000);
          } else {
               console.log(`No NPCs set.`);
               setNPCs([]);
          }
          if(books[i].party){
               console.log(`Party set: ${party}`);
               setTimeout(setParty(books[i].party), 1000);
          } else {
               console.log(`No party members set.`);
               setParty([]);
          }
          console.log(`Game loaded.`);
     }

     

     function saveBook(Book, id){
          API.saveBook(Book, id).then(res=>{
               console.log(`Success...?: ${JSON.stringify(res)}`);
          }).catch(err=>{
               console.log(err)
               saveNewBook(stfNthngs.gameName)
          });
     }

     function saveNewBook(Book, title){
          API.newBook(Book, title).then(res=>{
               console.log(res);
          }).catch(err=>{
               console.log(err);
          });
     }

     function addToRoyalDecrees(decreeObject){
          setRoyalDecrees(decreeObject);
          var saveThisBook = {_id: books[bookIndex]._id, id:stfNthngs.userId, title:stfNthngs.gameName, party:party, NPCs:NPCs, capIsSpecial:capIsSpecial, royalDecrees:decreeObject};
          console.log(saveThisBook);
          setTimeout(saveBook(saveThisBook, ),1000);
     }
     
     function spellFailed(error){
          const randomEvents = ["You've just turned a player into a toad.","Is... Is that a tiny rain cloud floating over your head...?","Oh.... Now your hair is on fire...","Are... Are you... Translucent...?","Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaand now it's raining..."];
          const length = randomEvents.length;
          const randomEvent = (Math.round(Math.random()*length)-1);
          const message = `You may need more practice. Please consult the spell book if you're having trouble.`;
          let errorMessage;
          if(error){
               errorMessage = `${error}${message}`;
          } else {
               errorMessage = message;
          }
          const decreefailed = `${randomEvents[randomEvent]} ${errorMessage}`;
          addToRoyalDecrees([...royalDecrees,
               {
                    "text":decreefailed
               }]);
     }
     
     function submitDecree(e){
          e.preventDefault();
          const orignalDecree = decreeRef.current.value.split(" ");
          const decreeTemp = decreeRef.current.value.toLowerCase();
          const decreeArray = decreeTemp.split(" ");
          switch(decreeArray[0]){
               // case"save":
               //      let errorMessage = `To save the game, recite "save game [insert title]". All spaces in the title must be represented with underscores. `;
               //      if(decreeArray[1] === "game" || decreeArray[1] === "game:" || decreeArray[1] === "book:" || decreeArray[1] === "book"){
               //           if(decreeArray[2]){
               //                saveNewBook(decreeArray[2]);
               //           } else {
               //                saveBook(stfNthngs.gameName);
               //                spellFailed(errorMessage);
               //           }
               //      } else {
               //           spellFailed(errorMessage);
               //      }
               //      break;
               // case"load":
               //      let error = `To load a game, please recite "save game [insert title]". All spaces in the title must be represented with underscores. `;
               //      if(decreeArray[1] === "game" || decreeArray[1] === "game:" || decreeArray[1] === "book" || decreeArray[1] === "book:"){
               //           if(decreeArray[2]){
               //                loadBook(decreeArray[2]);
               //           } else {
               //                spellFailed(error);
               //           }
               //      } else {
               //           spellFailed(error);
               //      }
               //      break;
               case"roll":
                    if(decreeArray[1]){
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
                         addToRoyalDecrees([...royalDecrees,
                              {
                                   "text": decreeRef.current.value,
                                   "value":value
                              }
                         ]);
                    } else {
                         spellFailed(`Please recite the number of dice and the number of sides with the following incantation: "roll (# of dice)d(# of sides)". Do not use any spaces in between the numbers and the letter d.`);
                    }
                    break;
               case"add":
                    switch(decreeArray[1]){
                         case"player":
                              switch(decreeArray[2]){
                                   case"character":
                                   case"character:":
                                        if(decreeArray[3]){
                                             const newPlayer = decreeArray[3];
                                             if(party.includes(newPlayer)){
                                                  const value = `${capitalize(newPlayer)} is already a member of your party.`;
                                                  addToRoyalDecrees([...royalDecrees,
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
                                                                      break;
                                                                 default:
                                                            }
                                                            break;
                                                       default:
                                                  }
                                                  const value = `New player character: ${capitalize(newPlayer)}`;
                                                  setParty([...party,
                                                       {
                                                            "name":newPlayer
                                                       }
                                                  ]);
                                                  addToRoyalDecrees([...royalDecrees,
                                                       {
                                                            "text":value
                                                       }
                                                  ]);
                                             }
                                        } else {
                                             spellFailed("Please recite a player characters name when next you attempt this spell. ");
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
                                   addToRoyalDecrees([...royalDecrees,
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
                              addToRoyalDecrees([...royalDecrees,
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
                                             addToRoyalDecrees([...royalDecrees,
                                                  {
                                                       "text":value
                                                  }
                                             ]);
                                        } else {
                                             const value = `${capitalize(exitPlayer)} is not a member of the party`;
                                             addToRoyalDecrees([...royalDecrees,
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
                              let newNPC = decreeArray[2];
                              if(NPCs.includes(newNPC)){
                                   const value = `${capitalize(newNPC)} is already a member of a non player character.`;
                                   addToRoyalDecrees([...royalDecrees,
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
                              addToRoyalDecrees([...royalDecrees,
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
                         case"members:":
                              let value=`Party members: `;
                              if(party.length === 1){
                                   value+=`Just ${capitalize(party[0].name)}...`;
                              } else if (party.length === 2){
                                   value+=`${capitalize(party[0].name)} and ${capitalize(party[1].name)}.`;
                              } else {
                                   for(let i = 0; i < party.length; i++){
                                        if(i === party.length-1){
                                             value+=` and ${capitalize(party[i].name)}.`
                                        } else {
                                             value+=`${capitalize(party[i].name)}, `;
                                        }
                                   }
                              }
                              addToRoyalDecrees([...royalDecrees,
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
                              if(NPCs.length === 2){
                                   value+=`${capitalize(NPCs[0].name)} and ${capitalize(NPCs[1].name)}.`
                              } else{
                                   for(let i = -1; i < NPCs.length; i++){
                                        if(NPCs[i] != null){
                                             if(i === NPCs.length-1){
                                                  value+=` and ${capitalize(NPCs[i].name)}.`
                                                  console.log(NPCs[i]);
                                             } else {
                                                  value+=`${capitalize(NPCs[i].name)}, `;
                                             }
                                        }
                                   }
                              }
                              addToRoyalDecrees([...royalDecrees,
                                   {
                                        "text":value
                                   }
                              ]);
                              break;
                         case"flavor":
                              switch(decreeArray[2]){
                                   case"text":
                                   case"text:":
                                        let value="Flavor: ";
                                        decreeArray[3] = capitalize(decreeArray[3]);
                                        for(let i = 3; i < decreeArray.length; i++){
                                             for(let j = 0; j < party.length; j++){
                                                  switch(decreeArray[i]){
                                                       case party[j]:
                                                            decreeArray[i] = capitalize(decreeArray[i]);
                                                            break;
                                                       default:
                                                            const checkForPunc = decreeArray[i-1].split("");
                                                            if(checkForPunc[checkForPunc.length-1] === "." || checkForPunc[checkForPunc.length-1] === "!" || checkForPunc[checkForPunc.length-1] === "?"){
                                                                 decreeArray[i] = capitalize(decreeArray[i]);
                                                            }
                                                  }
                                             }
                                             value += ` ${decreeArray[i]}`;
                                        }
                                        const checkForPunc = value.split("");
                                        if(checkForPunc[checkForPunc.length-1] !== "." && checkForPunc[checkForPunc.length-1] !== "!" && checkForPunc[checkForPunc.length-1] !== "?" ){
                                             value+=".";
                                        }
                                        addToRoyalDecrees([...royalDecrees,
                                             {
                                                  "text":value
                                             }
                                        ]);
                                        break;
                                   default:
                                        spellFailed();
                              }
                              break;
                         default:
                              spellFailed();
                    }
                    break;
               case"abucus":
               case"abucus:":
               case"calculate":
               case"calculate:":
                    var result;
                    var equation;
                    var firstNum;
                    let calculus;
                    var secNum;
                    if(decreeArray[1]){
                         const findOperator = decreeArray[1].split("");
                         for(let i = 0; i<findOperator.length; i++){
                              if(isNaN(findOperator[i])){
                                   calculus = findOperator[i];
                              }
                         }
                         equation = decreeArray[1].split(calculus);
                         firstNum = parseInt(equation[0]);
                         secNum = parseInt(equation[1]);
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
                              addToRoyalDecrees([...royalDecrees,
                                   {
                                        "text":result
                                   }
                              ])
                         }
                    break;
               case"banana":
                    var name = decreeArray[1];
                    name = capitalize(name);
                    addToRoyalDecrees([...royalDecrees,
                         {
                              "text":`${name} is bananas!`
                         }
                    ]);
                    break;
               case"troglodyte":
                    var name = decreeArray[1];
                    name = capitalize(name);
                    addToRoyalDecrees([...royalDecrees,
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
                    let object;
                    for(let i = 0; i < NPCs.length; i++){
                         if(decreeArray[1] === party[i]){
                              subject = party[i];
                         }
                    }
                    if(subject){
                         switch(decreeArray[2]){
                              case"attack":
                              case"attacks":
                              case"attacked":
                                   addToRoyalDecrees([...royalDecrees,
                                        {
                                             "text":`${capitalize(subject)} attacked ${capitalize(object)}`
                                        }]);
                                   break;
                              default:
                                   spellFailed();
                         }
                    }
                    else{
                         addToRoyalDecrees([...royalDecrees,
                         {
                              "text": `${capitalize(decreeArray[1])} is not a player`
                         }]);
                    }
                    break;
               case"set":
                    let value = decreeArray[3];
                    let dataType;
                    switch(decreeArray[1]){
                         case"health":
                         case"hp":
                              dataType = "health";
                              break;
                         case"str":
                         case"strength":
                              dataType = "strength";
                              break;
                         case"dex":
                         case"dexterity":
                              dataType = "dexterity";
                              break;
                         case"con":
                         case"constitution":
                              dataType = "constitution";
                              break;
                         case"int":
                         case"intelligence":
                              dataType = "intelligence";
                              break;
                         case"wis":
                         case"wisdom":
                              dataType = "wisdom";
                              break;
                         case"cha":
                         case"charisma":
                              dataType = "charisma";
                              break;
                         default:
                              spellFailed("The options for set are hp (health), str (strength), dex (dexterity), con (constitution), int (intelligence), wis (wisdom), and cha (charisma)");
                    }
                    if(value){
                         let char;
                         let index = 0;
                         for(let i = index; i < party.length; i++){
                              if(decreeArray[2] === party[i].name){
                                   console.log(party[i]);
                                   char = decreeArray[2];
                                   index = i;
                              }
                         }
                         if(char){
                              switch(dataType){
                                   case"health":
                                        party[index].health = value;
                                        break;
                                   case"strength":
                                        party[index].str = value;
                                        break;
                                   case"dexterity":
                                        party[index].dex = value;
                                        break;
                                   case"intelligence":
                                        party[index].int = value;
                                        break;
                                   case"wisdon":
                                        party[index].wis = value;
                                        break;
                                   case"charisma":
                                        party[index].cha = value;
                                        break;
                                   default:
                              }
                              addToRoyalDecrees([...royalDecrees,
                                   {
                                        "text": `${capitalize(char)} ${dataType}: ${value}`
                                   }]);
                         } else {
                              spellFailed(`Please enter a character name next time. ${capitalize(decreeArray[2])} is not a current party member. If you would like to add them, simply type "add party member: ${capitalize(decreeArray[2])}. `);
                         }
                    } else {
                         spellFailed(`This spell won't work unless you enter a value. `);
                    }
                    break;
               default:
                    let char;
                    let index;
                    for(let i = 0; i < party.length; i++){
                         if(decreeArray[0] === party[i].name){
                              char = true;
                              index = i;
                         }
                    }
                    if(char){
                         switch(decreeArray[1]){
                              case"stats":
                              case"stats:":
                                   let text = [{text:`${capitalize(decreeArray[0])} stats:`}];
                                   text = [...text, {text : `-Health: ${party[index].health}`}];
                                   text = [...text, {text : `-STR: ${party[index].str}`}];
                                   text = [...text, {text : `-DEX: ${party[index].dex}`}];
                                   text = [...text, {text : `-CON: ${party[index].con}`}];
                                   text = [...text, {text : `-INT: ${party[index].int}`}];
                                   text = [...text, {text : `-WIS: ${party[index].wis}`}];
                                   text = [...text, {text : `-CHA: ${party[index].cha}`}];
                                   addToRoyalDecrees([...royalDecrees,
                                        ...text
                                   ]);
                                   break;
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
                                                       let index;
                                                       for(let i = 0; i < capIsSpecial.length; i++){
                                                            if(capIsSpecial[i].name === decreeArray[0]){
                                                                 index = i;
                                                            }
                                                       }
                                                       if(index){
                                                            let value = `${capitalize(decreeArray[0])} already has special capitalization. Were you attempting to remove a special capitalization scheme for ${capitalize(decreeArray[0])}?`;
                                                            addToRoyalDecrees([...royalDecrees,
                                                                 {
                                                                      "text":value
                                                                 }]);
                                                       } else {
                                                            setCapSpecial([...capIsSpecial,
                                                                 {
                                                                      "name":decreeArray[0],
                                                                      "cap":orignalDecree[0]
                                                                 }]);
                                                            let value = `${capitalize(orignalDecree[0])}'s new capitalization scheme has been set.`;
                                                            addToRoyalDecrees([...royalDecrees,
                                                                 {
                                                                      "text":value
                                                                 }]);
                                                       }
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
                                                                      if(capIsSpecial[i].name === decreeArray[0]){
                                                                           index = i;
                                                                      }
                                                                 }
                                                                 if(index){
                                                                      capIsSpecial.splice(index);
                                                                      let value = `${capitalize(decreeArray[0])} has not special capitalization.`;
                                                                      addToRoyalDecrees([...royalDecrees,
                                                                           {
                                                                                "text":value
                                                                           }]);
                                                                 } else {
                                                                      let value = `${capitalize(decreeArray[0])} has not special capitalization. Were you attempting to set a special capitalization scheme for ${capitalize(decreeArray[0])}?`;
                                                                      addToRoyalDecrees([...royalDecrees,
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
                         spellFailed("");
                    }
          }
          // saveData(royalDecrees[royalDecrees.length]);
          decreeRef.current.value = "";
     };
     
     return(
          <div className="scroll-container">
               <h1 className="scroll-heading">Decree Scroll</h1>
               <div className="decree-scroll">
                    {royalDecrees ? royalDecrees.map((decree, index)=>{
                         if(index >= royalDecrees.length-30)
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
                         else {
                              return null;
                         }
                    }): null}
                    <div ref={decreesEndRef}></div>
               </div>
               <form onSubmit={submitDecree}>
                    <input className="col-12 decree-box" name="DecreeBox" ref={decreeRef} />
               </form>
          </div>
     );
}

export default RenderDungeon;