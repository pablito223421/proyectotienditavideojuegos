import {BASE_PATH} from "../utils/constants";
import {authFetch} from "../utils/fetch";

export async function getOrdersApi (idUser,logout){
try {
 const url = `http://localhost:1337/orders?_sort=createdAt:desc&user=${idUser}`;
 const result= authFetch(url,null,logout);
 return result;
} catch (error) {
   console.log(error);
   return null; 
}
}