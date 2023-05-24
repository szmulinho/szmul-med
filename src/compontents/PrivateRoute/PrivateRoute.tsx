import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, UserContextProps } from '../../context/UserContext';

interface PrivateRouteProps {
    path: string;
    element: JSX.Element;
    requiredRole: string;
}

export function PrivateRoute({ path, element, requiredRole }: PrivateRouteProps) {
    const userContext = useContext(UserContext);
    const userRole = userContext?.role;
    const isLoggedIn = userContext?.isLoggedIn;

    if (!isLoggedIn || !userRole || userRole !== requiredRole) {
        return <Route path={path} element={element} />;
           }

    return <Navigate to="/doctor_log" replace />;
}

