import React,{useState,useEffect} from "react";
import {Grid} from "semantic-ui-react";
import {size,map} from "lodash";
import Link from "next/link";
import classNames from "classnames";
import {getAddressesApi} from "../../../../api/Address";
import useAuth from "../../../hooks/userAuth";


export default function AddressShipping(props) {
const{setAddress}=props; 
const [addressActive,setAddressActive]=useState(null);
const [addresses,setAddresses]=useState(null);
const {auth,logout} =useAuth();

useEffect(() => {
  (async()=>{
   const response = await getAddressesApi(auth.idUser,logout);
   setAddresses(response || []);
  })()
}, [])

    return (
        <div className="address-shipping">
        <div className="title">Dirección de Envío</div> 
        <div className="data">
        {size(addresses)===0 ?(
         <h3>No hay dirección creada{""}
        <Link href="/account">
          <a>Añadir tu primera dirección ...</a>
        </Link>
         </h3>
        ):(
        <Grid>
            {map(adresses,(adress)=>{
            <Grid.Column key={address.id}mobile={16} tablet={8} computer={4}>
            <Address address={address} addressActive={addressActive} setAddress={setAddress}/>
            </Grid.Column>
            })}
        </Grid>
        )}
        </div>
        </div>
    )
}


function Address(props){
  const {address,setAddress,addressActive,setAddressActive}=props;

  const changeAddress = () =>{
   setAddressActive(address._id);
   setAddress(address);
  }

  return(
  <div 
  className={classNames("address",{
    active: AddressActive=== address._id,
  })}
  onClick={changeAddress}
  >
    <p>{address.title}</p>
    <p>{address.name}</p>
    <p>{address.address}</p>
    <p>
      {address.city},{address.state},{address.postalCode}
      </p>
    <p>{address.phone}</p>
  </div>
  );
}
