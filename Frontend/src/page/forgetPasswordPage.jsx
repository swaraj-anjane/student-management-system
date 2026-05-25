import React from 'react'
import { useForm,  } from 'react-hook-form';
import axiosInstance from '../services/axiosInstance';
import { Link } from 'react-router';




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

const ForgetPasswordPage = () => {
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitted },
} = useForm();


  async function handleForgetPassword(data) {

    console.log("payload",data);
    
    try {
        const response = await axiosInstance.get(
          `/admin/forget-password?email=${data.email}`,
        );
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

          <h3>Reset your password</h3>

          <form
            onSubmit={handleSubmit(handleForgetPassword)}
            noValidate
            className="space-y-5">
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
                  Sending reset link
                </span>
              : "send reset link"}
            </button>
          </form>
          {/* } */}

          {/* Footer link */}
          {!isSubmitted && (
            <p className="text-center text-white/30 text-sm mt-7">
              {/* get back to login */}
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

export default ForgetPasswordPage;