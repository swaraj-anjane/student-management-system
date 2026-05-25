import React from 'react'
import { useState } from 'react';
import { useForm,  } from 'react-hook-form';
import axiosInstance from '../services/axiosInstance';
import { Link } from 'react-router';


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

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
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





const RegisterPage = () => {
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitted },
} = useForm();

  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister(data) {
    console.log("payload",data);
    
    try {
        const response = await axiosInstance.post("/admin/register",data)
        alert(response.data.message)
    } catch (error) {
        alert(error.response.data.message)
    }
  }

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

          {/* {isSubmitted ?
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="text-white font-medium">Signed in successfully</p>
              <p className="text-white/40 text-sm mt-1">Redirecting you now…</p>
            </div> */}
          <form
            onSubmit={handleSubmit(handleRegister)}
            noValidate
            className="space-y-5">
            {/* // name field */}
            <div>
              <label className="block text-white/60 text-[13px] font-medium mb-2 tracking-wide uppercase">
                name
              </label>
              <div className="relative group">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150 ${errors.name ? "text-red-400" : "text-white/25 group-focus-within:text-violet-400"}`}>
                  <MailIcon />
                </span>
                <input
                  type="text"
                  autoComplete="email"
                  placeholder="Enter your Name"
                  className={`w-full bg-white/[0.04] border text-white text-sm placeholder-white/20 rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-150 focus:bg-white/[0.06]
                      ${
                        errors.nameame ?
                          "border-red-500/60 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/20"
                        : "border-white/[0.08] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20"
                      }`}
                  {...register("name", {
                    required: "name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label className="block text-white/60 text-[13px] font-medium mb-2 tracking-wide uppercase">
                Email
              </label>
              <div className="relative group">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150 ${errors.email ? "text-red-400" : "text-white/25 group-focus-within:text-violet-400"}`}>
                  <MailIcon />
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`w-full bg-white/[0.04] border text-white text-sm placeholder-white/20 rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-150 focus:bg-white/[0.06]
                      ${
                        errors.email ?
                          "border-red-500/60 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/20"
                        : "border-white/[0.08] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20"
                      }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white/60 text-[13px] font-medium tracking-wide uppercase">
                  Password
                </label>
                <Link
                  to= {"/forget-password"}
                  className="text-violet-400/70 text-xs hover:text-violet-400 transition-colors duration-150">
                  Forgot password?
                </Link>
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
            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-4 h-4 rounded bg-white/[0.04] border border-white/[0.12] peer-checked:bg-violet-600 peer-checked:border-violet-600 transition-colors duration-150 flex items-center justify-center">
                  <svg
                    className="hidden peer-checked:block w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
              <span className="text-white/40 text-sm group-hover:text-white/60 transition-colors">
                Remember me for 30 days
              </span>
            </label>
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
                  Signing in…
                </span>
              : "Sign in"}
            </button>
          </form>
          {/* } */}

          {/* Footer link */}
          {!isSubmitted && (
            <p className="text-center text-white/30 text-sm mt-7">
              Already have an account{" "}
              <Link
                to={"/login"}
                className="text-violet-400/80 hover:text-violet-400 transition-colors duration-150">
                already have an account
              </Link>
            </p>
          )}
        </div>

        {/* Bottom caption */}
        <p className="text-center text-white/15 text-xs mt-5">
          Protected by 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;