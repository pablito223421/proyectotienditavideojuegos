import React from "react";
import {Tab} from "semantic-ui-react";
import InfoGame from "../InfoGame/InfoGame";


export default function TabsGame(props){
    const {game}=props;

    const panes= [
    {
      menuItem:"Información",
      render: () =>(
       <Tab.Pane>
           <InfoGame game={game}/>
        </Tab.Pane>
      ),
    },
    ];

    return <Tab className="tabs-name" panes={panes}/>;
}