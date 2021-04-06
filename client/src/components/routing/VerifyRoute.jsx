import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const VerifyRoute = (props) => {
    const { pathname } = useLocation();
    console.log(pathname)
    return (<h1>Verify Route</h1>);
}
 
export default VerifyRoute;