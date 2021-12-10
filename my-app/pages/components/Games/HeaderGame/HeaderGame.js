import React, {useState,useEffect} from "react";
import {Grid,Image,Icon,Button,GridColumn} from "semantic-ui-react";
import {size} from "lodash";

export default function HeaderGame(props) {
    const {game} = props;
    const {poster,title} = game;
    console.log(game);
    return (
       <Grid className="header-game">
           <GridColumn mobile={16} tablet={6}computer={5}>
           <Image src={poster.url} alt={title} fluid/>
           </GridColumn>
           <GridColumn mobile={16} tablet={10}computer={11}>
           <Info  game={game}/>
           </GridColumn>
        </Grid>
    );
}

function Info (props){
    const {game}= props;
    const {title,summary,price}=game;

    return (
    <>
       <div className="header-game__title"> 
       {title} 
       <Icon name="heart outline like"  link />
        </div>
        <div className="header-game__delivery">Entrega en 24/48 hrs</div>
        <div className="header-game__sumary" dangerouslySetInnerHTML={{__html:summary}}/>
        <div className="header-game__buy">
        <div className="header-game__buy-price">
        <p>Precio de la venta al público:{price}$</p>
        <div className="header-game__buy-price-actions">
        <p>{discount}%</p>
        <p>{price- Math.floor(price *discount)/100}$</p>
        </div>
        </div>
        <Button className="header-game__buy-btn">Comprar</Button>
        </div>
    </>
    );
}