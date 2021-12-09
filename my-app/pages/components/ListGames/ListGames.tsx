import React from "react";
import {Image,Grid} from "semantic-ui-react";
import Link from "next/link";
import {map} from "lodash";

export default function ListGames(props) {
    const {games} = props;
    return (
        <div className="list-names">
             <Grid>
                 <Grid.Row columns={5}>
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
