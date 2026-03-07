/**
 * Authentication Utility Functions
 * Helper functions for role-based access control and route protection
 */

/**
 * User Roles
 */
export const ROLES = {
  BUYER: "BUYER",
  WORKER: "WORKER",
  ADMIN: "ADMIN"
};

/**
 * Check if user has a specific role
 * @param {Object} session - NextAuth session object
 * @param {string} role - Role to check (BUYER, WORKER, ADMIN)
 * @returns {boolean}
 */
export function hasRole(session, role) {
  return session?.user?.role === role;
}

/**
 * Check if user has any of the specified roles
 * @param {Object} session - NextAuth session object
 * @param {Array<string>} roles - Array of roles to check
 * @returns {boolean}
 */
export function hasAnyRole(session, roles) {
  return roles.includes(session?.user?.role);
}

/**
 * Check if user is authenticated
 * @param {Object} session - NextAuth session object
 * @returns {boolean}
 */
export function isAuthenticated(session) {
  return !!session?.user;
}

/**
 * Check if user is a buyer
 * @param {Object} session - NextAuth session object
 * @returns {boolean}
 */
export function isBuyer(session) {
  return hasRole(session, ROLES.BUYER);
}

/**
 * Check if user is a worker
 * @param {Object} session - NextAuth session object
 * @returns {boolean}
 */
export function isWorker(session) {
  return hasRole(session, ROLES.WORKER);
}

/**
 * Check if user is an admin
 * @param {Object} session - NextAuth session object
 * @returns {boolean}
 */
export function isAdmin(session) {
  return hasRole(session, ROLES.ADMIN);
}

/**
 * Get role-specific dashboard route
 * @param {string} role - User role
 * @returns {string} Dashboard route
 */
export function getDashboardRoute(role) {
  const routes = {
    [ROLES.BUYER]: "/dashboard/buyer",
    [ROLES.WORKER]: "/dashboard/worker",
    [ROLES.ADMIN]: "/dashboard/admin"
  };
  return routes[role] || "/dashboard";
}

/**
 * Get user's dashboard route from session
 * @param {Object} session - NextAuth session object
 * @returns {string} Dashboard route
 */
export function getUserDashboard(session) {
  return getDashboardRoute(session?.user?.role);
}
