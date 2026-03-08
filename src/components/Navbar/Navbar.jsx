"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, LogIn, CodeXml, LogOut, Menu } from "lucide-react";
import NavLink from "./NavLink";

// Role-based dashboard route mapping
const getDashboardRoute = (role) => {
  const routes = {
    BUYER: "/dashboard/buyer-home",
    WORKER: "/dashboard/worker-home",
    ADMIN: "/dashboard/admin-home"
  };
  return routes[role] || "/dashboard";
};

// Navigation configuration
const getNavigationItems = (isAuthenticated, userRole) => {
  if (!isAuthenticated) {
    // Logged-out navigation
    return [
      { label: "Home", href: "/", icon: null },
      { label: "How it works", href: "/#how-it-works", icon: null },
      { label: "Testimonials", href: "/#testimonials", icon: null },
      { label: "Login", href: "/login", icon: LogIn, variant: "primary" },
      { label: "Join as Developer", href: "https://github.com/rafiul-neti/taskearn-client", icon: CodeXml, variant: "primary" }
    ];
  }

  // Logged-in navigation
  return [
    { label: "Home", href: "/", icon: Home },
    { label: "Dashboard", href: getDashboardRoute(userRole), icon: LayoutDashboard },
    { label: "Logout", action: () => signOut(), icon: LogOut, variant: "error" }
  ];
};

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const isAuthenticated = status === "authenticated";
  const userRole = session?.user?.role;
  const navigationItems = getNavigationItems(isAuthenticated, userRole);

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // Focus trap and Escape key handler for drawer
  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (e) => {
      // Close drawer on Escape key
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        toggleButtonRef.current?.focus();
      }

      // Focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Loading state
  if (status === "loading") {
    return (
      <nav className="bg-base-100 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-primary">TaskEarn</span>
            </div>
            <div className="flex gap-2">
              <div className="skeleton h-10 w-20"></div>
              <div className="skeleton h-10 w-20"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-base-100 border-b border-base-300" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-primary hover:text-primary-focus" aria-label="TaskEarn home">
                TaskEarn
              </Link>
            </div>

            {/* Mobile Menu Toggle - Visible only on mobile */}
            <button
              ref={toggleButtonRef}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="btn btn-ghost md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={24} />
            </button>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2" role="menubar">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                
                if (item.action) {
                  // Button for actions (like logout)
                  return (
                    <button
                      key={index}
                      onClick={item.action}
                      className={`btn ${item.variant ? `btn-${item.variant}` : 'btn-ghost'} gap-2`}
                    >
                      {Icon && <Icon size={18} />}
                      {item.label}
                    </button>
                  );
                }

                // Use NavLink for navigation
                return (
                  <NavLink
                    key={index}
                    href={item.href}
                    variant={item.variant || "ghost"}
                    icon={Icon}
                    className={item.label === "Login" && "btn-outline"}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`drawer ${isDrawerOpen ? 'drawer-open' : ''} md:hidden`}>
        <input
          id="mobile-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={() => setIsDrawerOpen(!isDrawerOpen)}
          aria-label="Mobile navigation drawer"
        />
        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-drawer"
            className="drawer-overlay"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close navigation menu"
          ></label>
          <div className="menu p-4 w-80 min-h-full bg-base-100" role="navigation" aria-label="Mobile navigation menu" ref={drawerRef}>
            {/* Brand in drawer */}
            <div className="mb-4">
              <Link
                href="/"
                className="text-xl font-bold text-primary"
                onClick={() => setIsDrawerOpen(false)}
              >
                TaskEarn
              </Link>
            </div>

            {/* Navigation links in vertical layout */}
            <ul className="space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                
                if (item.action) {
                  // Button for actions (like logout)
                  return (
                    <li key={index}>
                      <button
                        onClick={() => {
                          item.action();
                          setIsDrawerOpen(false);
                        }}
                        className={`btn ${item.variant ? `btn-${item.variant}` : 'btn-ghost'} w-full justify-start gap-2`}
                      >
                        {Icon && <Icon size={18} />}
                        {item.label}
                      </button>
                    </li>
                  );
                }

                // Use NavLink for navigation in mobile drawer
                return (
                  <li key={index}>
                    <NavLink
                      href={item.href}
                      variant={item.variant || "ghost"}
                      icon={Icon}
                      onClick={() => setIsDrawerOpen(false)}
                      isMobile={true}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
