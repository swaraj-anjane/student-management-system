import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../services/axiosInstance";
import { Link, useParams } from "react-router";

const EyeIcon = ({ open }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    {open ?
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    : <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    }
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

export default function RestPasswordPage() {

 const [showPassword, setShowPassword] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const { resettoken } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const handleResetPassword = async (data) => {
    try {
    let payload = { password: data.password, token: resettoken };      //main error token unfinied aara
let response = await axiosInstance.post("/admin/update-new-password", payload)
console.log(response.data);
window.location.replace(response.data.redirect);

    } catch (error) {
      alert(error.response.data.message);
    }

  //   setSubmitted(true);
  //   console.log("Login data:", data);
  // };

  // console.log("reset details", payload);
  };
  return (
    <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center px-4 py-12 font-sans">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-500/8 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Card */}
        <div className="relative bg-[#16161d] border border-white/[0.07] rounded-2xl px-8 pt-10 pb-9 shadow-2xl">
          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent rounded-full" />

          <h3>Change your password</h3>

          <form
            onSubmit={handleSubmit(handleResetPassword)}
            noValidate
            className="space-y-5">
            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white/60 text-[13px] font-medium tracking-wide uppercase">
                  new Password
                </label>
              </div>
              <div className="relative group">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150 ${errors.password ? "text-red-400" : "text-white/25 group-focus-within:text-violet-400"}`}>
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full bg-white/[0.04] border text-white text-sm placeholder-white/20 rounded-xl pl-10 pr-11 py-3 outline-none transition-all duration-150 focus:bg-white/[0.06]
                      ${
                        errors.password ?
                          "border-red-500/60 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/20"
                        : "border-white/[0.08] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20"
                      }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/*  confrim Password field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white/60 text-[13px] font-medium tracking-wide uppercase">
                  confirm Password
                </label>
              </div>
              <div className="relative group">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150 ${errors.confirmPassword ? "text-red-400" : "text-white/25 group-focus-within:text-violet-400"}`}>
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full bg-white/[0.04] border text-white text-sm placeholder-white/20 rounded-xl pl-10 pr-11 py-3 outline-none transition-all duration-150 focus:bg-white/[0.06]
                      ${
                        errors.password ?
                          "border-red-500/60 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/20"
                        : "border-white/[0.08] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20"
                      }`}
                  {...register("confirmPassword", {
                    required: "confirmPassword is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full mt-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl py-3 transition-all duration-150 active:scale-[0.98] overflow-hidden">
              {isSubmitting ?
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeOpacity="0.25"
                    />
                    <path
                      d="M12 2a10 10 0 0110 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  reseting
                </span>
              : "reset password"}
            </button>
          </form>

          {/* Bottom caption */}
          <p className="text-center text-white/15 text-xs mt-5">
            Protected by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );



}

