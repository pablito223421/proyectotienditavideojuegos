import React, {useState} from "react";
import  {Form , Button} from "semantic-ui-react";
import  {useFormik} from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/userAuth";
import {createAddressApi,updateAddressApi} from "../../../../api/Address";
import { toast } from "react-toastify";

export default function AdressForm(props) {
const {setShowModal,setReloadAddresses,newAddress,address}=props;
const [loading,setLoading]= useState(false);
const {auth,logout} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema:Yup.object(validationSchema()),
    onSubmit: (formData)=> {
     newAddress ? createAddress(formData):updateAddress(formData);
    },
  });

  const createAddress = async (formData)=>{
   
    
    setLoading(true);
   const formDataTemp ={
    ... FormData,
    user: auth.idUser,
   };
   const response = await createAddressApi (formDataTemp,logout);
   if(!response){
     toast.warning("Error en ingresar la dirección");
     setLoading(false);
   }else{
     formik.resetForm();
     setReloadAddresses(true);
     setLoading(false);
     setShowModal(false);
   }
  };

const updateAddress=(formData)=>{
setLoading(true);
const formDataTemp={
...FormData,
user:auth.idUser,
};
const response= updateAddressApi(address._id,formDataTemp,logout);
if(!response){
  toast.warning("Error en actualizar la dirección");
  setLoading(false);
}else{
  formik.resetForm();
  setReloadAddresses(true);
  setLoading(false);
  setShowModal(false);
}
};
    return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input 
      name="title"
      type="text"
      label="Titulo de la dirección"
      placeholder="Titulo de la dirección"
      onChange={formik.handleChange}
      value={formik.values.title}
      error={formik.errors.title}
      />

    <Form.Group widths="equal">
    <Form.Input 
      name="name"
      type="text"
      label="Nombres y Apellidos"
      placeholder="Nombres y Apellidos"
      onChange={formik.handleChange}
      value={formik.values.name}
      error={formik.errors.name}
      />
      <Form.Input 
      name="address"
      type="text"
      label="Dirección"
      placeholder="Dirección"
      onChange={formik.handleChange}
      value={formik.values.address}
      error={formik.errors.address}
      />
    </Form.Group>
    
    <Form.Group widths="equal">
    <Form.Input 
      name="city"
      type="text"
      label="Ciudad"
      placeholder="Ciudad"
      onChange={formik.handleChange}
      value={formik.values.city}
      error={formik.errors.city}
      />
      <Form.Input 
      name="state"
      type="text"
      label="Estado/Provincia/Región"
      placeholder="Ciudad"
      onChange={formik.handleChange}
      value={formik.values.state}
      error={formik.errors.state}
      />
    </Form.Group>

    <Form.Group widths="equal">
    <Form.Input 
      name="postalCode"
      type="text"
      label="Codigo Postal"
      placeholder="Codigo Postal"
      onChange={formik.handleChange}
      value={formik.values.postalCode}
      error={formik.errors.postalCode}
      />
      <Form.Input 
      name="phone"
      type="text"
      label="numero de telefono"
      placeholder="numero de telefono"
      onChange={formik.handleChange}
      value={formik.values.phone}
      error={formik.errors.phone}
      />
      <div className="actions">
        <Button className="submit" type="submit" loading = {loading}>
          {newAddress ? "Crear dirección" : "Actualizar dirección" }
        </Button>
      </div>
    </Form.Group>
    </Form>
    );
}

function initialValues(address){
  return{
   title:address?.title || "",
   name:address?.name || "",
   address:address?.address || "",
   city:address?.city || "",
   state:address?.state || "",
   postalCode:address?.postalCode || "",
   phone:address?.phone || "",
  };
}

function ValidationSchema(){
  return {
    title:Yup.string().required(true),
    name:Yup.string().required(true),
    address:Yup.string().required(true),
    city:Yup.string().required(true),
    state:Yup.string().required(true),
    postalCode:Yup.string().required(true),
    phone:Yup.string().required(true),
  };
}
