import React, {useEffect, useRef, useState} from "react";
import {BookProvider} from './context/bookApiContext';
import {useAuth0} from "@auth0/auth0-react";
// import LogIn from "./pages/logIn";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Game from "./pages/game";
import LoginButton from "./Components/loginButton";
import LogoutButton from "./Components/logoutButton";
import Header from "./Components/Header";
import MainMenu from './pages/MainMenu';
import API from "./utils/api";
import GameInstructions from "./Components/GameInstructions";

function App() {
  const screenNameBox = useRef();
  const {user, isAuthenticated} = useAuth0();
  const [account, setAccount] = useState([]);
  const [username, logIn] = useState("");
  const [isDM, changeDM] = useState("false");
  const [gameState, setGameState] = useState(false);
  const [gameCode, setGameCode] = useState();
  const [gameName, setGameName] = useState();
  const [charName, setCharName] = useState();
  const logo = "https://www.underconsideration.com/brandnew/archives/dungeons_and_dragons_40_ampersand_detail_black.jpg";
  useEffect(() => {
    if(user){
      logIn(user.nickname);
      API.getUser({
        id: user.sub
      }).then(result=>{
        setAccount(result.data);
        logIn(result.data[0].screenName);
        if(JSON.stringify(result.data) === "[]"){
          API.newUser({
            screenName: user.nickname,
            id: user.sub
          }).then(result=>{
            setAccount(result.data);
            logIn(result.data.screenName);
          }).catch(err=>console.log(err));
        }
      }).catch((err)=>{
        console.log(err);
        API.newUser({
          screenName: user.nickname,
          id: user.sub
        }).then(result=>{
          setAccount(result.data);
          logIn(result.data.screenName);
          console.log(`newUser .then working: ${account}`);
        }).catch(err=>console.log(err));
      });
    } else {
      logIn("");
    }
  }, [isAuthenticated])

  function changeScreenName(e){
    e.preventDefault();
    API.setScreenName(user.sub, {
         screenName: screenNameBox.current.value
    }).then(()=>{
         // console.log(res);
         logIn(screenNameBox.current.value);
         screenNameBox.current.value = "";
    });
  }

  function setGameStates(v){
    setGameState(v);
  }

  function changeDMs(v){
    changeDM(v);
  }

  function setGame(name, code, charName){
    setGameName(name);
    setGameCode(code);
    setCharName(charName);
  }

  return (
    <BookProvider>
    <div className="App table">
        <Header className="table">
          <img className="top rounded" src={logo}  alt="logo" height={75}/>
          {isAuthenticated ? <LogoutButton className="scroll" /> : <LoginButton className="scroll"/>}
          <p>{username}</p>
          {isAuthenticated ?
          <form onSubmit={changeScreenName}>
            <div>
              <label htmlFor="usernameupdate">Change screenname here:</label>
            </div>
            <input className="col-4 decree-box" name="usernameupdate" ref={screenNameBox}/>
          </form> : <p></p>}
          <div>
            {gameName ? <h2>Game: {gameName}</h2> : <p></p>}
          </div>
        </Header>
      {isAuthenticated && gameState ?
        <Game setGameName={(v)=>setGameName(v)} gameName={gameName} gameCode={gameCode} isDM={isDM} user={user} userId={user.sub} username={username} charName={charName}/>
      :
      isAuthenticated ?
        <MainMenu setGameState={(v)=>setGameStates(v)} userId={user.sub} setGame={(gameName, code, charName)=>setGame(gameName, code, charName)} changeDM={(v)=>changeDMs(v)} gameState={gameState} isAuthenticated={isAuthenticated} isDM={isDM}/>
      :
        <div className="table"><p>Log in to begin your adventure...</p><GameInstructions /></div>
      }
    </div>
    </BookProvider>
  );
}

export default App;