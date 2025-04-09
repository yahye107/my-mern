import { callAuthApi } from "@/service";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Create the context
const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user data
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookies = async () => {
      try {
        const data = await callAuthApi();

        if (data?.success) {
          setUser(data.userInfo);

          const isAdmin = data.userInfo.role.toLowerCase() === "admin";
          const allowedPath = isAdmin ? "/admindash" : "/userdash";
          const publicRoutes = ["/", "/auth", "/auth/login", "/auth/register"];

          // Redirect authenticated users from public routes to their dashboard
          if (publicRoutes.includes(location.pathname)) {
            navigate(allowedPath);
          } else if (!location.pathname.startsWith(allowedPath)) {
            // Redirect if on a non-allowed protected route
            navigate(allowedPath);
          }
        } else {
          setUser(null);
          // Define protected routes that require authentication
          const protectedRoutes = ["/admindash", "/userdash"];
          const isProtected = protectedRoutes.some((route) =>
            location.pathname.startsWith(route)
          );

          // Redirect to auth only if trying to access protected routes
          if (isProtected) {
            navigate("/auth");
          }
        }
      } catch (error) {
        setUser(null);
        const protectedRoutes = ["/admindash", "/userdash"];
        const isProtected = protectedRoutes.some((route) =>
          location.pathname.startsWith(route)
        );

        if (isProtected) {
          navigate("/auth");
        }
      } finally {
      }
    };

    verifyCookies();
  }, [navigate, location.pathname]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for easier access
export const useUser = () => useContext(UserContext);
