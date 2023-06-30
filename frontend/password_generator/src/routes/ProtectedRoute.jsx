import React from 'react'
import { selectUser } from '../redux-toolkit/userSlice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = ({ ...props }) => {

    const user = useSelector(selectUser);

    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to={props.logoutPath} />;
    }

}

export default ProtectedRoute;