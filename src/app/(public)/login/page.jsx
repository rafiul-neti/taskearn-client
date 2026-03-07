import Link from "next/link";
import { LogIn } from "lucide-react";
import LoginForm from "@/components/forms/LoginForm";

/**
 * Login Page (Server Component)
 * Renders the login form with header and layout
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
              <LogIn size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your TaskEarn account
            </p>
          </div>

          {/* Login Form Component */}
          <LoginForm />
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="link link-hover text-gray-600 dark:text-gray-400">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
