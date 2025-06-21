import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import Loading from '../Pages/Shared/Loading/Loading';

const PrivateRoutes = ({children}) => {
    const { user, loading} = useAuth();

    if(loading) {
        return <Loading></Loading>
    }

    if(!user) {
        <Navigate to='/login'></Navigate>
    }

    return children
};

export default PrivateRoutes;