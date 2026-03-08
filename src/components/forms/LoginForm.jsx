"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

/**
 * Login Form Component
 * Uses react-hook-form for validation
 * Handles authentication via NextAuth
 */
export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || `/dashboard`;

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  /**
   * Form submission handler
   * Calls NextAuth signIn with credentials
   */
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (result?.error) {
        toast.error(result.error || "Invalid email or password", {
          duration: 4000
        });
      } else if (result?.ok) {
        toast.success("Login successful! Redirecting...", {
          duration: 2000,
          icon: "🎉"
        });
        
        // Redirect after short delay
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 4000
      });
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            padding: "16px",
            borderRadius: "8px"
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff"
            }
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff"
            }
          }
        }}
      />

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={20} className="text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="user@example.com"
              className={`input input-bordered w-full pl-10 ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address"
                }
              })}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.email.message}
              </span>
            </label>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={20} className="text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full pl-10 ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.password.message}
              </span>
            </label>
          )}
          <label className="label">
            <Link href="/forgot-password" className="label-text-alt link link-hover">
              Forgot password?
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Signing in...
            </>
          ) : (
            <>
              <LogIn size={20} />
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="divider my-6">OR</div>

      {/* Register Link */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="link link-primary font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
