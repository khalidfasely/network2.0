import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface Props {
    children: any
}

export const PrivateRoute: React.FC<Props> = ({children}) => {
    const { email } = useSelector((state:any) => state.auth);

    return (
        email ?
        children :
        <Navigate to="/login" />
    )
};