"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * NavLink component that highlights the active route
 * Supports both regular links and button-styled links with icons
 * 
 * @param {string} href - The destination URL
 * @param {React.ReactNode} children - The link content (text/icon)
 * @param {string} variant - DaisyUI button variant (ghost, primary, etc.)
 * @param {React.Component} icon - Lucide icon component
 * @param {string} className - Additional CSS classes
 * @param {Function} onClick - Optional click handler
 * @param {boolean} isMobile - Whether this is rendered in mobile drawer
 */
const NavLink = ({ 
  href, 
  children, 
  variant, 
  icon: Icon, 
  className = "",
  onClick,
  isMobile = false
}) => {
  const pathname = usePathname();

  // Check if this link is active
  // For home page, exact match; for others, check if path starts with href
  const isActive = href === "/register" ? false :  href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Build the button classes
  const buttonClasses = `btn btn-${variant} gap-2 ${
    isActive ? 'text-primary' : ''
  } ${isMobile ? 'w-full justify-start' : ''} ${className}`;

  return (
    <Link
      href={href}
      className={buttonClasses}
      onClick={onClick}
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );
};

export default NavLink;
