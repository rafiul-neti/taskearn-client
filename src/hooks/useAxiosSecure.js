"use client";

import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

/**
 * Custom Hook: useAxiosSecure
 * Creates an axios instance with automatic JWT token injection
 * Handles authentication and authorization errors
 *
 * @returns {import('axios').AxiosInstance} Configured axios instance with auth
 */
export default function useAxiosSecure() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Create axios instance with useMemo to prevent recreation on every render
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
      timeout: 30000, // 30 seconds
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });
  }, []);

  useEffect(() => {
    // Request Interceptor - Add JWT token to every request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // Add authorization header if token exists
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        // Log request in development
        if (process.env.NODE_ENV === "development") {
          console.log(`🔐 [${config.method.toUpperCase()}] ${config.url}`, {
            hasToken: !!session?.accessToken,
            data: config.data,
            params: config.params,
          });
        }

        return config;
      },
      (error) => {
        console.error("❌ Request Interceptor Error:", error);
        return Promise.reject(error);
      },
    );

    // Response Interceptor - Handle auth errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        // Log successful response in development
        if (process.env.NODE_ENV === "development") {
          console.log(
            `✅ [${response.config.method.toUpperCase()}] ${response.config.url}`,
            {
              status: response.status,
              data: response.data,
            },
          );
        }
        return response;
      },
      (error) => {
        if (error.response) {
          const { status, data } = error.response;

          // Log error
          console.error(`❌ [${status}] ${error.config?.url}`, {
            message: data?.message || error.message,
            data: data,
          });

          // Handle authentication errors
          if (status === 401) {
            console.warn("🔒 Unauthorized - Session expired or invalid token");

            // Redirect to login page
            if (typeof window !== "undefined") {
              const currentPath = window.location.pathname;
              router.push(
                `/login?callbackUrl=${encodeURIComponent(currentPath)}`,
              );
            }
          }

          // Handle authorization errors
          if (status === 403) {
            console.warn("🚫 Forbidden - Insufficient permissions");
            // Optionally redirect to unauthorized page
            // router.push('/unauthorized');
          }

          // Handle not found
          if (status === 404) {
            console.warn("🔍 Resource not found");
          }

          // Handle server errors
          if (status >= 500) {
            console.error("💥 Server error");
          }
        } else if (error.request) {
          // Request made but no response
          console.error("📡 No response from server:", error.message);
        } else {
          // Request setup error
          console.error("⚙️ Request setup error:", error.message);
        }

        return Promise.reject(error);
      },
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [session, router, axiosSecure]);

  return axiosSecure;
}

/**
 * Usage Example:
 *
 * const axiosSecure = useAxiosSecure();
 *
 * // GET request
 * const response = await axiosSecure.get('/api/tasks');
 *
 * // POST request
 * const response = await axiosSecure.post('/api/tasks', taskData);
 *
 * // PUT request
 * const response = await axiosSecure.put('/api/tasks/123', updates);
 *
 * // DELETE request
 * const response = await axiosSecure.delete('/api/tasks/123');
 */
