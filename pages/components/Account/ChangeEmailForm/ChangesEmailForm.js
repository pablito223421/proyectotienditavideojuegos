import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import { updateEmailApi } from '../../../../api/User.tsx';

export default function ChangesEmailForm(props) {
    const {user,logout,setReloadUser}=props;
    const [loading, setLoading]= useState (false);

    const formik = useformik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData)=>{
            setLoading(true);
           const response = await updateEmailApi (user.id, formData.email, logout );
           if(!response || response ?.statusCode ===400){
            toast.success("Error al acutalizar el email");
            }
            else{
                setReloadUser(true);
                toast.success("Email Actualizado");
                formik.handleReset();
            }
            setLoading(false);

        }
    });
    return (
        <div>
           <h4>Cambia tu email-<span>(Tu email actual :{user.email})</span></h4>
           <Form onSubmit={formik.handleSubmit}>
           <Form.Group widths="equal">
               <Form.Input  
               name="email" 
               placeholder=" Tu e-mail"
               onChange={formik.handleChange}
               value={formik.values.email} 
               error={formik.errors.email}/>
               <Form.Input 
               name="repeat-email" 
               placeholder ="nuevamente tu email"
               onChange={formik.handleChange}
               value={formik.values.repeatemail}
               error={formik.errors.repeatemail} />
            </Form.Group>
            <Button  classname="submit" loading={loading}>
                Actualizar
            </Button>
          </Form> 
        </div> 
    );
}

function initialValues(){
    return {
        email:"",
        repeatemail:"",
    };
}

function validationSchema(){
    return{
        email:Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref("repeatemail")], true),
        repeatemail:Yup.string()
        .email(true)
        .required(true) 
        .oneOf([Yup.ref("email")],true),
    };
}