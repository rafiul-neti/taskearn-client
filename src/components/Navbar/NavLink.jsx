"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Final NavLink Component
 * Highlights based on exact match for dashboard roots and prefix match for sub-routes.
 */
const NavLink = ({ 
  href, 
  children, 
  variant = "ghost", 
  icon: Icon, 
  className = "",
  onClick 
}) => {
  const pathname = usePathname();

  // 1. Logic for Active State:
  // - If it's a dashboard root (Home), use an exact match to prevent it from staying active on sub-pages.
  // - For all other links, use startsWith so the parent remains active on sub-routes.
  const isDashboardRoot = href.endsWith("/buyer") || href.endsWith("/worker") || href.endsWith("/admin");
  
  const isActive = isDashboardRoot 
    ? pathname === href : (href === "/" ? pathname === "/" : pathname.startsWith(href))

  // 2. Build DaisyUI button classes
  const buttonClasses = `btn btn-${variant} gap-3 ${
    isActive ? 'bg-primary/10 text-primary font-bold border-r-4 border-primary' : 'font-medium opacity-80'
  } ${className}`;

  return (
    <Link
      href={href}
      className={buttonClasses}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <span className="flex-1 text-left">{children}</span>
    </Link>
  );
};

export default NavLink;