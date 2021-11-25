/* eslint-disable import/no-anonymous-default-export */
import {useContext} from "react";
import AuthContext from "../context/AutoContext";

export default () => useContext(AuthContext);