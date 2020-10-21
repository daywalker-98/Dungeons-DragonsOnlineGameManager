import React, {useEffect, useRef, useState} from "react";
import RenderPlayer from "./pages/playerContainer";
import RenderDungeon from "./pages/DmGamePage";
import {useAuth0} from "@auth0/auth0-react";
// import LogIn from "./pages/logIn";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Game from "./pages/game";
import LoginButton from "./Components/loginButton";
import LogoutButton from "./Components/logoutButton";
import Header from "./Components/Header";
import API from "./utils/api";

function App() {
  const screenNameBox = useRef();
  const {user, isAuthenticated} = useAuth0();
  const [account, setAccount] = useState([]);
  const [username, logIn] = useState("");
  const [isDM, changeDM] = useState(true);
  const logo = "https://www.underconsideration.com/brandnew/archives/dungeons_and_dragons_40_ampersand_detail_black.jpg";
  useEffect(() => {
    if(user){
      logIn(user.nickname);
      API.getUser({
        id: user.sub
      }).then(result=>{
        console.log(result);
        setAccount(result.data);
        logIn(result.data[0].screenName);
        console.log(result.data[0].screenName);
        console.log(JSON.stringify(account));
        if(JSON.stringify(result.data) === "[]"){
          API.newUser({
            screenName: user.nickname,
            id: user.sub
          }).then(result=>{
            setAccount(result.data);
            logIn(result.data.screenName);
            console.log(`newUser .then working: ${account}`);
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
    }).then(res=>{
         // console.log(res);
         logIn(screenNameBox.current.value);
         screenNameBox.current.value = "";
    });
  }

  return (
    <div className="App">
      <div className="table">
        <Header className="table">
          <img className="top" src={logo}  alt="logo" height={75}/>
          {isAuthenticated ? <LogoutButton className="scroll" />: <LoginButton className="scroll"/>}
          <p>{username}</p>
          <form onSubmit={changeScreenName}>
            <label htmlFor="usernameupdate">Change screenname here:</label>
            <input className="col-4 decree-box" name="usernameupdate" ref={screenNameBox}/>
          </form>
        </Header>
      </div>
      {isAuthenticated ? <Game isDM={isDM} user={user} userId={user.sub}/>: <p></p>}
    </div>
  );
}

export default App;