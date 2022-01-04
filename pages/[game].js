import React, {useState,useEffect} from "react";
import BasicLayout from "./layouts/BasicLayout/BasicLayout.tsx";
import {useRouter} from "next/router";
import {getGamesPlatformApi} from "../api/Game.tsx";
import HeaderGame from "../pages/components/Games/HeaderGame/HeaderGame.tsx";
import TabsGame from "../pages/components/Games/TabsGame/TabsGame.tsx";
import  Seo from "../pages/components/SEO.tsx";


export default function Game() {
const [game, setGame] = useState(null);
const {query}=useRouter();

useEffect(() => {
   (async ()=>{
    const response = await  getGamesPlatformApi(query.game);
    setGame(response);
   })()
}, [query])

if(!game) return null;

    return (
        <BasicLayout className="game">
        <Seo title={game.title}/>
         <HeaderGame game={game} /> 
         <TabsGame game={game}/>
        </BasicLayout>
    );
}
 