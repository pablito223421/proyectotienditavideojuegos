import React from "react";
import {Image,Grid} from "semantic-ui-react";
import Link from "next/link";
import {map} from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import {breakpointUpSm,
    breakpointUpMd,breakpointUpLg} from "../../../utils/breakpoint";

export default function ListGames(props) {
    const {games} = props;
    const {width} = useWindowSize();
    
    const getColumnsRender = () =>{
        switch (true) {
            case width>breakpointUpLg:
                return 5;
                break;
            case width>breakpointUpMd:
                return 3;
                break;
            case width>breakpointUpSm:
                return 2;
                break;   
            default:
                return 1;
                break;
        }
    }

    return (
        <div className="list-names">
             <Grid>
                 <Grid.Row columns={getColumnsRender()}>
                 {map(games,(game)=>(
                 <Game game={game}/>
             ))}   
                 </Grid.Row>
             </Grid>
        </div>
    );
}

function Game(props){
const {game} = props;
return (
<Grid.Column className="listname__name">
<Link href={`/${game.url}`}>
<a>
    <div className="games__game-poster">
    <Image  src={game.poster.url} alt={game.title}/>
    <div className="list-games__game-poster-info">
        {game.discount ?(
            <span className="discount">-{game.discount}%</span>
        ):(
           <span/>
        )}
        <span className="price">{game.price}</span>
    </div>
    </div>
    <h2>{game.title}</h2>
    </a>
</Link>
</Grid.Column>
);
}
