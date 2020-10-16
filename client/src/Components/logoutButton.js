import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const LoginButton = ()=>{
     const {logout} = useAuth0();
     return <button className="scroll" onClick={()=>logout({returnTo:window.location.origin})} >Log out</button>;
}

export default LoginButton;