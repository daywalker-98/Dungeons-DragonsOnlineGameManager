import React, {useEffect, useRef, useState} from "react";
import RenderPlayer from "./pages/playerContainer";
import RenderDungeon from "./pages/DmGamePage";
import {useAuth0} from "@auth0/auth0-react";
// import LogIn from "./pages/logIn";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginButton from "./Components/loginButton";
import LogoutButton from "./Components/logoutButton";

function App() {
  const {user, isAuthenticated} = useAuth0();
  const [username, logIn] = useState("");
  const [isDM, changeDM] = useState(true);
  const logo = "https://www.underconsideration.com/brandnew/archives/dungeons_and_dragons_40_ampersand_detail_black.jpg";
  useEffect(() => {
    console.log(user);
    console.log(isAuthenticated);
    if(user){
      logIn(user.name);
    }
  }, [isAuthenticated])


  return (
    <div className="App">
      <header className="App-header">
        <img className="top" src={logo} className="App-logo" alt="logo" />
        {isDM ? <RenderDungeon /> : <RenderPlayer />}
        {isAuthenticated ? <div><LogoutButton /> <p>{user.name}</p></div>: <LoginButton />}
      </header>
    </div>
  );
}

export default App;