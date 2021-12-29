import React from "react";
import Header from "next/head";

export default function Seo(props){
const {title,description}=props;

    return(
     <Header>
     <title>{title}</title>
     <meta property="description" content={description} />
     </Header>
    );
}

Seo.defaultProps={
  title:"Gaming- Tus juegos favoritos",
  description:
  "Tus juegos favoritos para Stream,PlayStation,Xbox,Switch al mejor precio.",
};