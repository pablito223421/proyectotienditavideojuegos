import React, {useState,useEffect}from "react";
import BasicLayout from "./layouts/BasicLayout/BasicLayout";
import {Icon} from "semantic-ui-react";
import useRouter from "next-router";
import useAuth from "./hooks/userAuth";
import {getMeApi} from "../api/User";
import ChangeNameForm from "./components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "./components/Account/ChangeEmailForm/ChangesEmailForm";
import ChangePasswordForm from "./components/Account/ChangePasswordForm/ChangePasswordForm";
import BasicModal from "./components/Modal/BasicModal/BasicModal";
import AdressForm from "./components/Account/AdressForm/AdressForm";

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

    const openModal =(title) => {
       setTitleModal(title);
       setFormModal(<AdressForm setShowModal={setShowModal}/>);
       setShowModal(true);
    };

 return(
  <div className="account_adress">
  <div className="title">Direcciones
   <Icon name="plus" link  onClick={() => openModal("Nueva Dirección")}/>
  </div>
  <div className="data">
  <p>Lista de direcciones ... </p>
  </div>
  <BasicModal show={false} setShow={setShowModal} title={setTitleModal}>
     {formModal}
  </BasicModal>
  </div>
 );
}