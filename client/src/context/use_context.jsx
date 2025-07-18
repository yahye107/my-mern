import { callAuthApi } from "@/service";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Create the context
const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user data
  const [loading, setLoading] = useState(true); // loading state
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

          if (publicRoutes.includes(location.pathname)) {
            navigate(allowedPath);
          } else if (!location.pathname.startsWith(allowedPath)) {
            navigate(allowedPath);
          }
        } else {
          setUser(null);
          const protectedRoutes = ["/admindash", "/userdash"];
          const isProtected = protectedRoutes.some((route) =>
            location.pathname.startsWith(route)
          );

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
        setLoading(false); // stop loading when done
      }
    };

    verifyCookies();
  }, [navigate, location.pathname]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <div className="text-gray-500 text-lg animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for easier access
export const useUser = () => useContext(UserContext);
