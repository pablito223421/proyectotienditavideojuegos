import React, {useState,useEffect}from "react";
import BasicLayout from "./layouts/BasicLayout/BasicLayout.tsx";
import {Icon} from "semantic-ui-react";
import useRouter from "next-router";
import useAuth from "./hooks/userAuth.tsx";
import {getMeApi} from "../api/User.tsx";
import ChangeNameForm from "./components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "./components/Account/ChangeEmailForm/ChangesEmailForm";
import ChangePasswordForm from "./components/Account/ChangePasswordForm/ChangePasswordForm";
import BasicModal from "./components/Modal/BasicModal/BasicModal.tsx";
import AdressForm from "./components/Account/AdressForm/AdressForm";
import ListAddress from "./components/Account/ListAddress/ListAddress";

export default function Account (){
const [user, setUser] = useState(undefined);
const {auth, logout,setReloadUser} = useAuth();
const router = useRouter();

useEffect ( () =>{
(async () =>{
const response = await getMeApi(logout);
setUser(response || null);
})()
},[auth]);

if(user===undefined) return null;
if(!auth && !user){
    router.replace("/");
    return null;
}

return(
<BasicLayout className="account">
<Configuration user={user} logout={logout} setRaloadUser={setReloadUser}/>
</BasicLayout>
);
}

function Configuration(props){
    const {user, logout, setReloadUser} = props;
return(
    <div className="acount__configuration">
     <div className="title">Configuración</div>
     <div className="data">
     <ChangeNameForm user={user} logout={logout}  setReloadUser={setReloadUser}/>
     <ChangeEmailForm 
     user={user}
     logout={logout}
     setReloadUser={setReloadUser}/>
     <ChangePasswordForm user={user} logout={logout} />

     </div>
    </div>
)
}

function Adressees(){
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);
    const [reloadAddresses, setReloadAddresses] = useState(false);

    const openModal =(title,address) => {
       setTitleModal(title);
       setFormModal(<AdressForm 
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false: true}
        address={address || null}
        />
        );
       setShowModal(true);
    };

 return(
  <div className="account_adress">
  <div className="title">Direcciones
   <Icon name="plus" link  onClick={() => openModal("Nueva Dirección")}/>
  </div>
  <div className="data">
  <ListAddress 
  reloadAddresses={reloadAddresses} 
  setReloadAddresses={setReloadAddresses} 
  openModal={openModal}/>
  </div>
  <BasicModal show={false} setShow={setShowModal} title={setTitleModal}>
     {formModal}
  </BasicModal>
  </div>
 );
}