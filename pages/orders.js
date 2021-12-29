import React,{useState,useEffect}from "react";
import {Grid} from "semantic-ui-react";
import{map,size} from "lodash";
import BasicLayout from "../pages/layouts/BasicLayout/BasicLayout";
import {getOrdersApi} from "../api/Order";
import userAuth from "./hooks/userAuth";
import Order from "../pages/components/Orders/Order/Order";
import Seo from "../pages/components/SEO";

export default function Orders(){

const [orders,setOrders]=useState(null);
const {auth,logout}=userAuth();

useEffect(() => {
    (async ()=>{
     const response= await getOrdersApi(auth.idUser,logout);
     setOrders(response || []);
    })()
}, [])

return(
<BasicLayout className="orders">
<Seo title="Mis pedidos" description="Listado de todos tus pedidos"/>
<div className="orders__blocks">
<div className="title">Mis pedidos...</div>   
<div className="data">
{size(orders)===0 ? (
    <h2 style={{textAlign:"center"}}>
     Todavía no has realizado ninguna compra 
    </h2>
):(
    <OrderList orders={orders}/>
)}
</div>
</div>
</BasicLayout>
);
}

function OrderList (props){
const {orders}=props;
return(
<Grid>
{map(orders,(order)=>(
<Grid.Column mobile={16} table={6}computer={8}>
<Order order={order} />
</Grid.Column>
))}
</Grid>
);
}