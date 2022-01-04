/* eslint-disable react-hooks/exhaustive-deps */
import "../scss/gobal.scss";
import "semantic-ui-css/semantic.min.css";
import React, { useState,useEffect,useMemo } from "react";
import { ToastContainer, toast} from "react-toastify";
import { setToken, getToken,removeToken} from "../api/Token.tsx";
import AuthContext from "./context/AuthContext.tsx";
import CartContext from "./context/CartContext.tsx";
import jwtDecode from "jwt-decode";
import  {getProductsCart,addProductCart,countProductsCart,removeProductCart,removeAllProductsCart} from "../api/Cart";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  const [reloadUser,setReloadUser]= useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const[reloadCart,setReloadCart]=useState(false);
  const router = useRouter();
 
   useEffect( () =>{
     const token = getToken();
     if(token){
       setAuth({
        token,
        idUser: jwtDecode(token),
       });
     }else{
       setAuth(null);
     }
     setReloadUser(false);
   }, [reloadUser]);

  useEffect(() => {
   setTotalProductsCart(countProductsCart()); 
   setReloadCart(false);
  }, [reloadCart,auth]);
 
  const login = (token) =>{
    setToken(token);
    setAuth ({
    token,
    idUser : jwtDecode(token),
    });
  };

  const logout = () => {
    if (auth){
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

const addProduct = (product)=>{
  const token = getToken();
  if(token){
    addProductCart(product);
    setReloadCart(true);
  }else{
    toast.warning("Para comprar un juego tienes que iniciar sesión");
  }
};

const removeProduct = (product) =>{
  removeProductCart(product);
  setReloadCart(true);
}

  
  const authData = useMemo( () => ({
        auth,
        login,
        logout,
        setReloadUser,
      }), 

    [auth]
  );

  const cartData= useMemo(
    () =>({
    productsCart:totalProductsCart,
    addProductCart:(product)=>addProduct(product),
    getProductsCart: getProductsCart,
    removeProductsCart: (product)=>removeProduct(product),
    removeAllProductsCart: removeAllProductsCart,  
    }),
    [totalProductsCart]
  );

  if(auth===undefined) return null;

  return (

    /*AuthContext.Provider value {authData}*/
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
        </CartContext.Provider>
    </AuthContext.Provider>
    /*AuthContext.Provider*/
  );
    }
 






