import React from "react";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {STRIPE_TOKEN} from "../../../../utils/constants";
import FormPyment from "./FormPayment/FormPayment";

const stripePrimise = loadStripe(STRIPE_TOKEN);

export default function Payment(props) {
    const {products,address}=props;
    return (
        <div className="payment">
        <div className="tile">Pago</div>
        <div className="data">
        <Elements stripe={stripePrimise}>
        <FormPyment products={products} address={address}/>
        </Elements>
        </div>
        </div>
    )
}
