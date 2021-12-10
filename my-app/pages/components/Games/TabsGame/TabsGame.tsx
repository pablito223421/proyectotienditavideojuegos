import React from "react";
import {Tab} from "semantic-ui-react";

export default function TabsGame(props){
    const {game}=props;

    const panes= [
    {
      menuItem:"Información",
      render: () =>(
       <Tab.Pane>
           <h1>Info game</h1>
        </Tab.Pane>
      ),
    },
    ];

    return <Tab className="tabs-name" panes={panes}/>;
}