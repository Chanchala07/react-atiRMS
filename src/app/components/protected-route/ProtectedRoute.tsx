import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode,
    allowedRoles: number[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    allowedRoles,children
}) => {
    const userRoleId = parseInt(localStorage.getItem("UserRoleId") || "0", 10);
    
    if (!allowedRoles.includes(userRoleId)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <>{children}</>; 
}
export default ProtectedRoute;
