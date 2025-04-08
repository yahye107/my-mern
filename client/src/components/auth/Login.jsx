import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Mail, Key } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CommonForm from "../logcommonlayout/CommonForm";
import { callloginUserApi } from "@/service";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formData = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (getData) => {
    setLoading(true);
    console.log(getData);
    const data = await callloginUserApi(getData);
    console.log(data);
    if (data?.success) {
      toast("you have logged in");
      if (data.userData?.role?.toLowerCase() === "admin") {
        navigate("/admindash");
      } else {
        navigate("/userdash");
      }
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <CommonForm
        form={formData}
        formControls={[
          {
            id: "email",
            label: "Email",
            componentType: "input",
            type: "email",
            placeholder: "your@email.com",
          },
          {
            id: "password",
            label: "Password",
            componentType: "input",
            type: "password",
            placeholder: "••••••••",
          },
        ]}
        handleSubmit={handleSubmit}
        customLayout={{
          grid: [["email"], ["password"]],
          icons: {
            email: Mail,
            password: Key,
          },
        }}
        btnText={
          loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )
        }
        className="space-y-4"
        inputClassName="h-10 text-sm px-3"
        labelClassName="text-sm mb-1"
        buttonClassName="w-full h-12 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-semibold rounded-lg transition-colors duration-200"
      />

      {/* <div className="text-center space-y-2 mt-6">
        <button
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Forgot Password?
        </button>
        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/auth/register")}
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Create Account
          </button>
        </p>
      </div> */}
    </div>
  );
};

export default Login;
