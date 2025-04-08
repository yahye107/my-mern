import { useUser } from "@/context/use_context";
import { useLocation } from "react-router-dom";

const RequireAuth = ({ children, role }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />; // Or to an unauthorized page
  }

  return children;
};

export default RequireAuth;
