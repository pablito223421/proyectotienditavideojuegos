import React from 'react';
import {Form, Button} from "semantic-ui-react";

export default function ChangesEmailForm(props) {
    const {user,logout,setReloadUser}=props;
    return (
        <div>
           <h4>Cambia tu email-<span>(Tu email actual :{user.email})</span></h4>
           <Form>
           <Form.Group widths="equal">
               <Form.Input  name="email" placeholder=" Tu e-mail" />
               <Form.Input name="repeat-email" placeholder ="nuevamente tu email"/>
            </Form.Group>
            <Button  classname="submit">
                Actualizar
            </Button>
          </Form> 
        </div> 
    );
}
