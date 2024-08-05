import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

//This layout is used for protecting routes so that unauthorized or unauthenticated user can't access pages
function AuthLayout({children,authentication=true}) {

    const authStatus = useSelector(store => store.auth.status)
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,authentication,navigate])
  return loader?<><h1>Loading....</h1></>:<><div>{children}</div></>
}

export default AuthLayout