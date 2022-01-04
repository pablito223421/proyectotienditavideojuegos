import {BASE_PATH} from "../utils/constants";

export async function getLastNameApi(limit){
try{
const limitItems= `_limit=${limit}`;
const sortItem="&_sort=createdAt:desc";
const url = `http://localhost:1337/games?${limit}&${sortItem}`;
const response = await fetch(url);
const result= await response.json();
return result;
}catch(error){
console.log(error);
return null;
}
}

export async function getGamesPlatformApi(platform,limit,start){
    try {
       const limitItems= `_limit=${limit}`; 
       const sortItems= `_sort=createdAt:desc`;
       const startItems= `_start=${start}`;
       const url = `http://localhost:1337/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
       const response=await fetch(url); 
       const result = await response.json();
       return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTotalGamesPlatformApi(platform){
    try {
        const url= `http://localhost:1337/games/count?platform.url=${platform}`;
        const response =await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
       console.log(error);
       return null;       
    }
}

export async function getGameByUrlAppi(path){
    try {
        const url = `http://localhost:1337/games?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function searchGamesApi(title){
    try {
      const url =`http://localhost:1337/games?_q=${title}`;
      const response=await fetch(url);
      const result = await response.json();  
      return result;
    } catch (error) {
       console.log(error);
       return null; 
    }
}