import React from "react";
import {Form,Button} from "semantic-ui-react";
import {useFormik} from "formik";
import *  as Yup from "yup";
import {toast} from "react-toastify";

export default function ChangePasswordForm(props) {
    const {user,logout}=props;

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit: (formData) =>{
           console.log(formData);
        }
    })
    return (
        <div className="change-password-form">
          <h4>Cambiar Tus contraseñas</h4>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group widts="equal">
            <Form.Input 
            name="password"
            type="password" 
            placeholder="Tu nueva contraseña" 
            onChange={formik.handleChage}
            value={formik.values.password}
            error={formik.errors.password}/>
            </Form.Group>
            <Form.Group widts="equal">
            <Form.Input 
            name="repeatpassword"
            type="password" 
            placeholder="Confirma tú nueva contraseña"
            onChange={formik.handleChage}
            value={formik.values.repeatpassword}
            error={formik.errors.repeatpassword}/>
            </Form.Group> 
            <Button className="submit">
            Actualizar
            </Button>
          </Form>
        </div>
    );
}

function initialValues(){
    return {
        password: "",
        repeatpassword:"",
    };
}

function validationSchema(){
    return{
        password: Yup.string().required(true).oneOf([Yup.ref("repeatpassword")] , true),
        repeatpassword: Yup.string().required(true).oneOf([Yup.ref("password")] , true),
    }
}
