import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authenticationService from '../../appwrite/authentication'

function LogoutBtn() {

    const dispatch = useDispatch()
    const handleButtonClick = () => {
        authenticationService.logoutUser().then((res) => {
            if(res){
                dispatch(logout())
            }
        })
        dispatch(logout())
    }
    return (
        <button onClick={handleButtonClick}>Logout</button>
    )
}

export default LogoutBtn