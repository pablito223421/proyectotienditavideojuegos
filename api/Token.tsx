import {TOKEN} from "../utils/constants";
import jwtDecodes from "jwt-decode";

export function setToken(token){
    localStorage.setItem(TOKEN,token);
}


export function getToken (){
    return localStorage.getItem(TOKEN);
}

export function removeToken(){
    localStorage.removeItem(TOKEN);
}

export function hasExpiredToken(token){
    const tokenDecode = jwtDecodes(token);
    const expireDate= token.exp * 1000;
    const currentDate = new Date().getTime();
    if(currentDate> expireDate){
        return true;
    }
    return false;

}

