"use client";

import InputField from "@/components/ui/forms/InputField";
import { FormWrapper } from "@/components/ui/forms/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/schema/login.scheme";

const LoginForm = () => {
  const onSubmit = (data: any) => {
    console.log("Login form submitted with data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-xl border border-white/20">
        <h2 className="text-4xl font-extrabold text-white text-center mb-3">
          Welcome Back
        </h2>
        <p className="text-md text-gray-300 text-center mb-8">
          Log in to access your dashboard
        </p>

        <FormWrapper onSubmit={onSubmit} resolver={zodResolver(loginValidationSchema)}>
          <div className="space-y-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              // required

              size="md"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              // required
              size="md"
            />


            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-black/50 font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:shadow-md"
            >
              Sign In
            </button>
          </div>
        </FormWrapper>



      </div>
    </div>
  );
};

export default LoginForm;
