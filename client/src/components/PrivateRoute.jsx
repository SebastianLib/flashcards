import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
    // const [user, setUser] = useState(false);
    // if(!user) return <Navigate to="/sign-in"/>
  
    return children
}
