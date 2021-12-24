import {createContext} from "react";

const CartContext = createContext({
productsCart:0,
addProductCart:()=>null,
getProductsCart: ()=>null,
removeProductsCart: ()=>null,
removeAllProductsCart: ()=>null,
});

export default CartContext;