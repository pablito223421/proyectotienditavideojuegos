import React from "react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import {useRouter} from "next-router";

export default function Platform () {
    const {query} = useRouter();
    return (
        <BasicLayout className="platform">
        <h1>Estamos en plataforma: {query.platform}</h1>
        </BasicLayout>
    );
}
