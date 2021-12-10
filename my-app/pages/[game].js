import React, {useState,useEffect} from "react";
import BasicLayout from "./layouts/BasicLayout/BasicLayout";
import {useRouter} from "next/router";
import {getGamesPlatformApi} from "../api/Game";
import HeaderGame from "../pages/components/Games/HeaderGame/HeaderGame.tsx";
import TabsGame from "../pages/components/Games/TabsGame/TabsGame.tsx";

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
         <HeaderGame game={game} /> 
         <TabsGame game={game}/>
        </BasicLayout>
    );
}
 