import {BASE_PATH} from "../utils/constants";

export async function getPlatformsApi(){
try {
    const url = `http://localhost:1337/platforms?_sort=position:asc`;
    const response = await fetch(url);
    const result= await response.json();
    return result;
} catch (error) {
  console.log(error);
  return null;  
}
}