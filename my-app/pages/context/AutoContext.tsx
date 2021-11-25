import { createContext } from "react";

const AuthContext = createContext({
 auth:undefined,
 login:undefined,
 logout: ()=>null,
 setReloadUser:()=>null,
});

export default AuthContext;