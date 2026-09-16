
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }) {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
        return <Navigate to="/" replace />;
    }

    const user = JSON.parse(storedUser);
    const role = user?.role;

    if (roles && !roles.includes(role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;
