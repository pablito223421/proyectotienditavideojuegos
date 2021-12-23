import React,{useState,useEffect} from "react";
import {size,foreach} from "lodash";
import {Loader} from "semantic-ui-react"
import BasicLayout from "../pages/layouts/BasicLayout/BasicLayout";
import {getFavoriteApi}from "../api/Favorite";
import useAuth from "../pages/hooks/userAuth";
import ListGames from "../pages/components/ListGames/ListGames";

export default function wishlist(){

// eslint-disable-next-line react-hooks/rules-of-hooks
const [games,setGames]= useState(null);
// eslint-disable-next-line react-hooks/rules-of-hooks
const {auth, logout}= useAuth();

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
   (async()=>{
     const response= await getFavoriteApi(auth.idUser,logout);
     if(size(response)>0){
       const gameList= [];
       foreach(response,(data)=>{
         gameList.push(data.game);
       });
       setGames(gameList)
     }else{
       setGames([]);
     }
   })();
    
},[]);

return(
<BasicLayout className="wishlist">
<div className="wishlist__block">
<div className="title">Lista de deseos</div>
<div className="data">
{!games && <Loader active>Cargando juegos</Loader>}
        {games && size(games)===0 && (
          <div className="data__not-found">
           <h3>No tienes ningun juego en tu lista</h3>   
          </div>
        )}
        {size(games)>0  && <ListGames games ={games}/>}
</div>
</div>
</BasicLayout>
);
}