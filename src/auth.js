import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * NextAuth Configuration for TaskEarn Platform
 * Integrates with Express backend for authentication
 * Supports role-based access control (BUYER, WORKER, ADMIN)
 */

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      
      /**
       * Authorize function - calls Express backend for authentication
       * @param {Object} credentials - User credentials (email, password)
       * @returns {Object|null} User object if authenticated, null otherwise
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Call Express backend authentication endpoint
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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

          const data = await response.json();

          // Check if authentication was successful
          if (!response.ok) {
            throw new Error(data.message || "Authentication failed");
          }

          // Backend should return user object with: id, email, name, role, token
          if (data.success && data.user) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              role: data.user.role, // BUYER, WORKER, or ADMIN
              accessToken: data.token || data.accessToken
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(error.message || "Authentication failed");
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
    async jwt({ token, user, account }) {
      // Initial sign in - add user data to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      // Optional: Refresh token logic can be added here
      // Check if token is expired and refresh it from backend

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
    },

    /**
     * Redirect Callback - controls where users are redirected after auth
     */
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after login
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Default redirect to home
      return baseUrl;
    }
  },

  // Custom pages
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/register"
  },

  // Enable debug in development
  debug: process.env.NODE_ENV === "development"
};

// Initialize NextAuth
const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

export { handlers, auth, signIn, signOut };
