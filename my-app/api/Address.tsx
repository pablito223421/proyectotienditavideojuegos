import {authFetch} from "../utils/fetch";
import {BASE_PATH} from "../utils/constants";

export async function createAddressApi(address,logout){
try {
    const url= `${BASE_PATH}/addresses`;
    const params ={
    method:"POST",
    headers:{
    "Content-Type":"application/json",
    },
    body:JSON.stringify(address),
    };
    const result= await authFetch(url,params,logout);
    if(result.statusCode !=200) throw "Error en el servidor";
    return result;
} catch (error) {
   console.log(error);
   return null; 
} 
}

