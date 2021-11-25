import {getToken, hasExpiredToken} from "../../api/Token";

export async function authFetch(url,params, logout) {
    
    const token = getToken();

    if(token){
        //Usuario no logueador
        logout();
    }else{
      if(hasExpiredToken(token)){
          //token caducado
          logout();
      } else{
          const paramsTemp = {
             ... params,
             headers:{
              ... params?.headers,
              Autorization:`Bearer ${token}`,
             },
          };

        try {
            const response = await fetch (url,paramsTemp);
            const result = await response.json();
            return result;
        } catch (error) {
           return error; 
        }

      }
    }
}

