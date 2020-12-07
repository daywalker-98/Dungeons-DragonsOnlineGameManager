import React, {useRef, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";

const LoginButton = ()=>{
     const {logout} = useAuth0();
     return <button style={{height:71}} className="scroll top rounded" onClick={()=>logout({returnTo:window.location.origin})} >Log out</button>;
}

export default LoginButton;