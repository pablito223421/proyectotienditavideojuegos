import React , {useState,useEffect} from "react";
import {Grid,Button} from "semantic-ui-react";
import {size, map} from "lodash";
import {getAddressesApi,deleteAddressApi} from "../../../../api/Address.tsx";
import useAuth from "../../../hooks/userAuth.tsx";

export default function ListAddress(props) {
    const {reloadAddress,setReloadAddreses} = props;
    const [addresses, setAddresses] = useState(null);
    const {auth, logout} = useAuth();

    useEffect(()=>{
     ( async ()=>{
         const response = await getAddressesApi(auth.idUser,logout);
         setAddresses(response || []);
         setReloadAddreses(false);
     })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadAddress]);

    if(!addresses) return null;

    return (
        <div className="list-addresses">
            {size(addresses)===0 ? (
                <h3>No hay ninguna dirección creada</h3>
            ) : (
             <Grid>
              {map (addresses, (address)=>(
                 <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                 <Address address={address} logout= {logout} setReloadAddreses={setReloadAddreses}/>
                 </Grid.Column>
              ))}   
             </Grid>   
            )}
        </div>
    );
}

function Address (props){
    const {address,logout, setReloadAddreses,openModal} = props;
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deleteAddress = async () =>{
        setLoadingDelete(true);
      const response = await deleteAddressApi(address._id,logout);
      if(response) setReloadAddreses(true);
      setLoadingDelete(false);
    };

    return (
<div className="address">
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>
                {address.state}{address.city}{address.postalCode}
            </p>
            <p>{address.phone}</p>
        <div className="actions">
                <Button primary onClick={()=>openModal(`Editar:${address.title}`,address)}>Editar</Button>
                <Button onClic={deleteAddress} loading={loadingDelete}>Eliminar</Button>
            </div>
            </div>
    );
}
