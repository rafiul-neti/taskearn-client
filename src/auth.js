import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * NextAuth Configuration for TaskEarn Platform
 * Integrates with Express backend for authentication
 * Supports role-based access control (BUYER, WORKER, ADMIN)
 */

// Initialize NextAuth with configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
      
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("❌ Missing credentials");
            return null;
          }

          const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          console.log("🔐 Attempting login at:", `${backendUrl}/auth/login`);
          console.log("📧 Email:", credentials.email);
          
          const response = await fetch(`${backendUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          console.log("📡 Response status:", response.status);
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("❌ Backend error:", errorData.message || "Unknown error");
            return null;
          }

          const data = await response.json();
          console.log("📦 Response data:", { 
            success: data.success, 
            hasUser: !!data.user,
            message: data.message 
          });

          if (data.success && data.user) {
            console.log("✅ Authentication successful for:", data.user.email);
            
            // Return user object that matches NextAuth expectations
            return {
              id: data.user.id.toString(),
              email: data.user.email,
              name: data.user.name,
              role: data.user.role,
              accessToken: data.token
            };
          }

          console.error("❌ Invalid response format from backend");
          return null;
          
        } catch (error) {
          console.error("💥 Authentication error:", error.message);
          return null;
        }
      }
    })
  ],

  // Use JWT strategy for session management
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  callbacks: {
    /**
     * JWT Callback - runs when JWT is created or updated
     * Adds custom fields (role, accessToken) to the token
     */
    async jwt({ token, user }) {
      // Initial sign in - add user data to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    /**
     * Session Callback - runs when session is checked
     * Adds custom fields from token to session object
     */
    async session({ session, token }) {
      // Add custom fields to session.user
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }

      return session;
    }
  },

  // Custom pages
  pages: {
    signIn: "/login",
    error: "/login"
  },

  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
  
  // Trust host in development
  trustHost: true
});
