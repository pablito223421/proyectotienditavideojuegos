import React, {useState,useEffect} from "react";
import {Loader} from "semantic-ui-react";
import {size} from "lodash";
import BasicLayout from  "./layouts/BasicLayout/BasicLayout";
import {getLastNameApi} from "../api/Game";
import ListGames from "./components/ListGames/ListGames";
import Seo from "../pages/components/SEO";


export default function Home() {
  const [games, setGames] = useState(null);
  console.log(games);

  useEffect(() => {
    (async ()=>{
      const response= await getLastNameApi(5);
      if(size(response)>0) setGames(response);
      else setGames([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
    <Seo />
      {!games && <Loader active>Cargando Juegos</Loader>}
      {games && size(games)===0 &&(
        <div>
        <h3>No hay Juegos</h3>
        </div>
      )}
      {size(games)&& <ListGames games={games}/>}
    </BasicLayout>
  );
}