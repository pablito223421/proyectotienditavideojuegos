import React, {useState,useEffect}from "react";
import BasicLayout from "../pages/layouts/BasicLayout/BasicLayout";
import {useRouter} from "next-router";
import useAuth from "../pages/hooks/userAuth";
import {getMeApi} from "../api/User";
import ChangeNameForm from "../pages/components/Account/ChangeNameForm/ChangeNameForm";

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
     <ChangeNameForm user={user} logout={logout}  setRaloadUser={setReloadUser}/>
     </div>
    </div>
)
}