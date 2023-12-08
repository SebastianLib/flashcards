import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRoute({children}) {
    const {pathname} = useLocation();
    const {currentUser}= useSelector((state) => state.user);

    if(pathname === "/" && currentUser) return <Navigate to="/home"/>
    if(pathname === "/" && !currentUser) return children

    if(!currentUser) return <Navigate to="/sign-in"/>
    return children
}
