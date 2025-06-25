import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Shared/Loading/Loading';

const PrivateRoutes = ({children}) => {
    const { user, loading} = useAuth();
    console.log("user from Private Routes", user);
    const location = useLocation();

    if(loading) {
        return <Loading></Loading>
    }

    if(!user) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children
};

export default PrivateRoutes;