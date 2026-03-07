"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLink from "./NavLink";

/**
 * Mobile Drawer Component
 * Handles mobile navigation drawer with focus trap
 */
const MobileDrawer = ({ isOpen, onClose, navigationItems }) => {
  const pathname = usePathname();
  const drawerRef = useRef(null);

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Focus trap and Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Close drawer on Escape key
      if (e.key === 'Escape') {
        onClose();
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
  }, [isOpen, onClose]);

  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : ''} md:hidden`}>
      <input
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={onClose}
        aria-label="Mobile navigation drawer"
      />
      <div className="drawer-side z-50">
        <label
          htmlFor="mobile-drawer"
          className="drawer-overlay"
          onClick={onClose}
          aria-label="Close navigation menu"
        ></label>
        <div 
          className="menu p-4 w-80 min-h-full bg-base-100" 
          role="navigation" 
          aria-label="Mobile navigation menu" 
          ref={drawerRef}
        >
          {/* Brand in drawer */}
          <div className="mb-4">
            <Link
              href="/"
              className="text-xl font-bold text-primary"
              onClick={onClose}
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
                        onClose();
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
                    onClick={onClose}
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
  );
};

export default MobileDrawer;
