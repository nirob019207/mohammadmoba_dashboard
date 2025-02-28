"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { setUser } from "@/Redux/ReduxFunction";
import { useLoginUserMutation } from "@/Redux/Api/userApi";
import LoginSchema, { LoginFormData } from "@/schema/LoginSchema";

export default function LoginPage() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      toast.loading("Logging in...");

      const response = await loginUser(data).unwrap();

      if (response.status) {
        const token = response.data.token;
        const userEmail = response.data.user.email;

        // Set token in cookies
        Cookies.set("token", token, { expires: 7 });

        // Store user in Redux
        dispatch(setUser({ token, email: userEmail }));

        // Reset form
        reset();

        // Dismiss loading toast and show success message
        toast.dismiss();
        toast.success("Login successful! Redirecting...");

        // Redirect to homepage
        router.push("/");
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message);
  
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <div className="flex w-full items-center justify-center p-6">
        <div className="w-full max-w-[524px] space-y-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-2">Log in</h1>
            <p className="text-xl text-center">
              Please enter your email and password below!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                className="text-[18px] font-semibold text-slate-600"
                htmlFor="email"
              >
                Email address
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                className="w-full"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <Label
                className="text-[18px] font-semibold text-slate-600"
                htmlFor="password"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Link
                href="/forgot-password"
                className="text-sm text-slate-600 hover:text-red-700"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center rounded-lg items-center text-white text-[18px] font-medium py-[10px] bg-primary hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
