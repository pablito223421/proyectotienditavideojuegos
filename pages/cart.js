import React, {useState,useEffect} from "react";
import BasicLayout from "./layouts/BasicLayout/BasicLayout";
import {getGameByUrlApi}from "../api/Game";
import useCart from "./hooks/useCart.tsx";
import SummaryCart from "../pages/components/Cart/SummaryCart/SummaryCart.tsx";
import AddressShipping from "../pages/components/Cart/AddressShipping/AddressShipping.tsx";
import Payment from "../pages/components/Cart/Payment/Payment.tsx";

export default  function cart(){
// eslint-disable-next-line react-hooks/rules-of-hooks
const {getProductsCart}=useCart();
const products= getProductsCart();
 return !products ? <EmptyCart />: <FullCart products={products}/>;
}


function EmptyCart(){
    return(
        <BasicLayout className="emptty-cart">
          <h2>No hay productos en el carrito</h2>
        </BasicLayout>
    );
}

function FullCart(props){
const products=props;
const [productsData,setProductsData]=useState(null);
const [reloadCart,setReloadCart]=useState(false);
const [address,setAddress]=useState(null);



useEffect(() => {
    (async ()=>{
     const productTemp=[];
     for await (const product of products){
      const data =  await getGameByUrlApi(product); 
      productsTemp.push(data);   
     }
     setProductsData(productsTemp);
    })();
    setReloadCart(false);
}, [reloadCart]);

    return(
        <BasicLayout className="emptty-cart">
          <SummaryCart products={productsData}
          reloadCart={reloadCart}
          setReloadCart={setReloadCart}/>
        <AddressShipping  setAddress={setAddress}/>
    {address && <Payment products={productsData} adress= {address}/>}
</BasicLayout>
    );
}