import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { calllogoutUserApi } from "@/service";
import { useUser } from "@/context/use_context";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const doLogout = async () => {
      try {
        const response = await calllogoutUserApi();
        if (response.success) {
          setUser(null);
          toast.success("Logged out successfully!");
          navigate("/auth"); // Redirect after logout
        } else {
          toast.error("Logout failed.");
          navigate("/userdash"); // fallback
        }
      } catch (error) {
        toast.error("Logout error. Try again.");
        navigate("/userdash");
      }
    };

    doLogout();
  }, [navigate, setUser]);

  return <div className="p-6 text-gray-500">Logging out...</div>;
};

export default Logout;
