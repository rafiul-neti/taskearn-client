"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axiosPublic from "@/lib/axiosPublic";

/**
 * Register Form Component
 * Uses react-hook-form for validation
 * Submits to Express POST /auth/register
 */
export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "BUYER",
    },
  });

  const password = watch("password");

  /**
   * Form submission handler
   * Calls Express backend POST /auth/register
   */
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await axiosPublic.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      const result = response.data;

      if (result.success) {
        toast.success("Registration successful! Redirecting to login...", {
          duration: 3000,
          icon: "🎉",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(
          result.message || "Registration failed. Please try again.",
          {
            duration: 4000,
          },
        );
      }
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
        {
          duration: 4000,
        },
      );
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
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              className={`input input-bordered w-full pl-10 ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
              })}
              disabled={isLoading}
            />
          </div>
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.name.message}
              </span>
            </label>
          )}
        </div>

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
                  message: "Please enter a valid email address",
                },
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
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Password cannot exceed 100 characters",
                },
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
        </div>

        {/* Confirm Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Confirm Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={20} className="text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full pl-10 ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              disabled={isLoading}
            />
          </div>
          {errors.confirmPassword && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.confirmPassword.message}
              </span>
            </label>
          )}
        </div>

        {/* Role Selection */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">I want to</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="BUYER"
                className="hidden peer"
                {...register("role", { required: true })}
                disabled={isLoading}
              />
              <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 hover:border-blue-400">
                <Briefcase size={24} className="mx-auto mb-2 text-blue-600" />
                <div className="font-semibold text-gray-900 dark:text-white">
                  Post Tasks
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  As a Buyer
                </div>
              </div>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                value="WORKER"
                className="hidden peer"
                {...register("role", { required: true })}
                disabled={isLoading}
              />
              <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center transition-all peer-checked:border-purple-600 peer-checked:bg-purple-50 dark:peer-checked:bg-purple-900/20 hover:border-purple-400">
                <CheckCircle
                  size={24}
                  className="mx-auto mb-2 text-purple-600"
                />
                <div className="font-semibold text-gray-900 dark:text-white">
                  Complete Tasks
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  As a Worker
                </div>
              </div>
            </label>
          </div>
          {errors.role && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle size={14} />
                Please select a role
              </span>
            </label>
          )}
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
              Creating Account...
            </>
          ) : (
            <>
              <UserPlus size={20} />
              Create Account
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="divider my-6">OR</div>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="link link-primary font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
