import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
    const {currentUser}= useSelector((state) => state.user);
    console.log(currentUser);
    if(!currentUser) return <Navigate to="/sign-in"/>
    return children
}
