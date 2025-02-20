'use client';

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ForgotPasswordSchema, {
  ForgotPasswordData,
} from "@/schema/ForgotPasswordSchema";

// import { useForgotUserMutation } from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useForgotUserMutation } from "@/Redux/Api/userApi";
import { setEmail } from "@/Redux/allSlice/otpSlice";

export default function ForgotPassword() {
  const [forgotPas, { isLoading, isError, error }] = useForgotUserMutation(); // Hook usage
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      const response = await forgotPas(data).unwrap();
      dispatch(
        setEmail({
          email: data?.email,
        })
      );

      reset();

      router.push("/otp");
      toast.success("Enter your received OTP");
    } catch (err) {
      toast.error("The provided data is incorrect");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[454px] space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            {/* Logo could go here if needed */}
          </div>
        </div>

        {/* Form */}
        <div>
          <div className="text-center">
            <h1 className="text-2xl text-[#1D2939] sm:text-3xl md:text-4xl font-sans font-semibold">
              Forgot Password!
            </h1>
            <p className="text-xs sm:text-sm md:text-base mt-4 font-outfit text-gray-500">
              Enter your registered email below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mt-7">
              <Label
                htmlFor="email"
                className="text-base sm:text-lg md:text-[18px] font-normal font-outfit text-[#475467]"
              >
                Email address
              </Label>
              <Input
                id="email"
                placeholder="georgia.young@example.com"
                type="email"
                className="w-full text-[18px] text-[#475467] border-[#98A2B3] pr-10 placeholder:text-[#98A2B3] placeholder:text-sm placeholder:font-normal"
                {...register("email")} // Register the input with validation
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Remember password link */}
            <div className="flex items-center justify-start text-xs sm:text-sm">
              <span className="text-gray-600">Remember the password?</span>
              <Link
                href="/login"
                className="ml-1 underline text-[#00008B] font-medium font-inter hover:underline"
              >
                Sign in
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 flex justify-center rounded-lg items-center font-outfit text-white text-[18px] font-medium py-[10px] bg-primary hover:bg-blue-700"
              disabled={isLoading} // Disable while loading
            >
              {isLoading ? (
                <span>Sending...</span>
              ) : (
                <>
                  Send Code
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
