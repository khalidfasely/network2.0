import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface Props {
    children: any
}

export const AuthRoute: React.FC<Props> = ({children}) => {
    const { email } = useSelector((state:any) => state.auth);
    
    return (
        email ?
        <Navigate to="/" /> :
        children
    )
};