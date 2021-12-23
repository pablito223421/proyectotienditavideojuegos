import React, {useState,useEffect} from "react";
import {Grid,Image,Icon,Button,GridColumn} from "semantic-ui-react";
import {size} from "lodash";
import classNames from "classnames";
import {isFavoriteApi,addFavoriteApi,deleteFavoriteApi} from "../../../../api/Favorite";

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
    const {title,summary,price,discount}=game;
    const[isFavorite,setIsFavorite]=useState(false);
    const[reloadFavorite,setReloadFavorite]=useState(false);
    const {auth,logout} = useAtuh();
    
    useEffect(()=>{
        (async()=>{
            const response=await isFavoriteApi(auth.idUser,game.id,logout);
           if(size(response)>0)setIsFavorite(true);
           else setIsFavorite(false);
        })();
        setReloadFavorite(false);
    },[auth.idUser, game, logout, reloadFavorite]);

    const addFavorite = async() =>{
       if(auth){
         await addFavoriteApi(auth.idUser,game.id,logout);
         setReloadFavorite(true);
       }
    };

    const deleteFavorite = async()=>{
        if(auth){
            await deleteFavoriteApi(auth.idUser,game.id,logout);
            setReloadFavorite(true);
          }
    };

    return (
    <>
       <div className="header-game__title"> 
       {title} 
       <Icon name={isFavorite ? "heart" : "heart outline"} className={classNames({
           like: isFavorite,
       })} 
       link
       onClick ={isFavorite ? deleteFavorite: addFavorite} />
        </div>
        <div className="header-game__delivery">Entrega en 24/48 hrs</div>
        <div className="header-game__sumary" dangerouslySetInnerHTML={{__html:summary}}/>
        <div className="header-game__buy">
        <div className="header-game__buy-price">
        <p>Precio de la venta al público:{price}$</p>
        <div className="header-game__buy-price-actions">
        <p>{discount}%</p>
        <p>{(price- Math.floor(price *discount)/100).toFixed(2)}$</p>
        </div>
        </div>
        <Button className="header-game__buy-btn">Comprar</Button>
        </div>
    </>
    );
}