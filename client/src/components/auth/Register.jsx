import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, User, Mail, Key, Calendar, Gem } from "lucide-react";

import { signUpFormControls } from "@/config";
// import { callregisterUserApi } from "@/service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CommonForm from "../logcommonlayout/CommonForm";
import { callregisterUserApi } from "@/service";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formData = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      gender: "",
      age: "", // Now completely empty (no default 18)
      password: "",
    },
  });

  const handleSubmit = async (getData) => {
    setLoading(true);
    console.log("Submitted data:", getData);
    try {
      const data = await callregisterUserApi(getData);
      console.log(data);
      if (data?.success) {
        toast.success("you have successfully registered");
        navigate("/auth/login");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Ethier the user Name and email has Alredy been taking");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <CommonForm
        form={formData}
        formControls={signUpFormControls}
        handleSubmit={handleSubmit}
        buttonClassName="w-full h-12 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-semibold rounded-lg transition-colors duration-200"
        btnText={
          loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Creating Account...</span>
            </div>
          ) : (
            "Create Account"
          )
        }
        customLayout={{
          grid: [
            ["firstname", "lastname"],
            ["username", "age"],
            ["email"],
            ["gender", "password"],
          ],
          icons: {
            firstname: User,
            lastname: User,
            username: User,
            email: Mail,
            password: Key,
            age: Calendar,
            gender: User,
          },
        }}
        className="space-y-4"
        inputClassName="h-10 text-sm px-3"
        labelClassName="text-sm mb-1"
      />
    </div>
  );
};

export default Register;
