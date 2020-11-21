import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const LoginButton = ()=>{
     const {loginWithRedirect} = useAuth0();
     return <button style={{height:71}} onClick={()=>loginWithRedirect()} className="scroll top rounded" >Log in</button>;
}

export default LoginButton;