import { createContext } from "react";
import {useContext} from "react";

const authcontext = createContext({
 auth:undefined,
 login:undefined,
 logout: ()=>null,
 setReloadUser:()=>null,
});

export default authcontext;