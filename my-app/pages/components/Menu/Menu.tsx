import React, { useState , useEffect } from "react";
import {Container, Grid,Label,Menu,Icon} from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../Modal/BasicModal/BasicModal";
import Auth from "../Auth/Auth";
import useAuth from "../../hooks/userAuth";
import {getMeApi} from "../../../api/User";

export default function MenuWeb(){
  
const [showModal, setShowModal] = useState(false);
const [titleModal, setTitleModal] = useState("Iniciar Sesión");
const [user, setUser] = useState(undefined);
const {auth,logout } =useAuth();

useEffect(() => {
   (async ()=>{
     const response = await getMeApi(logout);
     setUser (response);
   })();
    
}, [auth, logout]);

const onShowModal = () =>setShowModal(true);
const onCloseModal = () =>setShowModal(false);

   return(
       <div className="menu">
        <Container>
        <Grid>
        <Grid.Column className="menu__left" width={6}>
        <MenuPlatforms/>
        </Grid.Column>
        <Grid.Column className="menu__right" width={10}>
            {user!== undefined && 
            <MenuOptions  onShowModal={onShowModal}
            user={user}
            logout={logout}/>}
           
        </Grid.Column>
        </Grid>
        </Container>
        <BasicModal 
        show={showModal} 
        setShow={setShowModal} 
        title={titleModal} 
        size="small">
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}/>
        </BasicModal>
       </div>
   ); 
}

function MenuPlatforms(){
    return(
     <Menu>
     <Link href="/play-station">
     <Menu.Item as="a">Playstation</Menu.Item>
     </Link>
     <Link href="/xbox">
     <Menu.Item as="a">Xbox</Menu.Item>
     </Link>
     <Link href="/switch">
     <Menu.Item as="a">Switch</Menu.Item>
     </Link>
     </Menu>   
    );
}

function MenuOptions(props){
    const{onShowModal,user,logout}=props;
    return(
     <Menu>
         { user ? (
             <>
             <Link href="/orders">
             <Menu.Item as="a">
                <Icon name="game"/>
                Mis Pedidos
             </Menu.Item>
             </Link>
             <Link href="/wishlist">
             <Menu.Item as="a">
                <Icon name="heart outline"/>
                WishList
             </Menu.Item>
             </Link>
             <Link href="/account">
             <Menu.Item as="a">
                <Icon name="user outline"/>
                {user.name} {user.lastname}
             </Menu.Item>
             </Link>
             <Link href="/cart">
                 <Menu.Item as="a" className="m-0">
                     <Icon name="cart" />
                 </Menu.Item>
             </Link>
             <Menu.Item onClick={logout}>
                 <Icon name="power off"/>
                 </Menu.Item>
            </>  
         ):(
     <Menu.Item onClick={onShowModal}>
     <Icon className="user outline"/>
     </Menu.Item>   
         )}
    </Menu>
    );
}