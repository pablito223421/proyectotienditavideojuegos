import React , {useState,useEffect} from "react";
import BasicLayout from "./layouts/BasicLayout/BasicLayout";
import { searchGamesApi } from "../api/Game";
import { useRouter } from "next/router";
import { size } from "lodash";
import ListGames from "./components/ListGames";
import { Loader } from "semantic-ui-react";

export default function search() {

// eslint-disable-next-line react-hooks/rules-of-hooks
const [games, setGames] = useState(null);
// eslint-disable-next-line react-hooks/rules-of-hooks
const {query}= useRouter();

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
    document.getElementById("search-game").focus();
}, []);

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
   ( async ()=>{
   if(size(query.query)>0){
      const response= await searchGamesApi(query.query);
   if(size(response)>0) setGames(response);
   else setGames([]);
   }else{
       setGames([]);
   }
   })()
}, [query])


    return (
        <BasicLayout classname="search">
        {!games && <Loader active>Buscando juegos</Loader>}
        {games && size(games)===0 &&(
        <div>
        <h3>No se han encontrado juegos</h3>
        </div>
        )}
        {size(games)>0 && <ListGames games={games} />}
        </BasicLayout>
    )
}
