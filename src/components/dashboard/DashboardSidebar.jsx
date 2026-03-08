"use client";

import NavLink from "@/components/Navbar/NavLink";
import Link from "next/link";
import { LogOut, ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";
import { DASHBOARD_MENU } from "@/config/dashboardMenu";

/**
 * Universal Dashboard Sidebar
 * Renders dynamic links based on the user's role (Worker, Buyer, Admin)
 * Responsive with DaisyUI drawer
 */
export default function DashboardSidebar({ session }) {
  const role = session?.user?.role; // e.g., "BUYER", "WORKER", "ADMIN"
  const menuItems = DASHBOARD_MENU[role] || [];

  return (
    <aside className="bg-base-200 w-64 border-r border-base-300 flex flex-col min-h-full">

      {/* Dynamic Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="menu gap-1 p-0">
          {menuItems.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                icon={item.icon}
                variant="ghost"
                className="justify-start w-full"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-base-300 space-y-2">
        <Link href="/" className="btn btn-outline btn-sm w-full gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="btn btn-error btn-outline btn-sm w-full gap-2"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}