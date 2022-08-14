import { Navigate,Outlet } from "react-router-dom"
import Cookies from "universal-cookie"
import React from "react";

function ProtectedRoute(){
    const cookies=new Cookies();
    if(cookies.get('jwt_token') !==undefined){
        return <Outlet/>
    }else{
        return <Navigate to={"/login"} replace/>
    }
}

export default ProtectedRoute;