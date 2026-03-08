"use client";

import { Bell } from "lucide-react";
import Link from "next/link";

/**
 * Dashboard Navbar
 * Shows: Logo | Available coin | User Image | User Role | User Name | Notification
 */
export default function DashboardNavbar({ user, coinBalance = 0 }) {
  return (
    <div className="navbar bg-base-200 border-b border-base-300 px-4">
      {/* Logo */}
      <div className="flex-none w-48">
        <Link href={`/`} className="text-2xl font-bold text-primary">TaskEarn</Link>
      </div>

      {/* Center: User Info */}
      <div className="flex-1 flex items-center gap-4 px-4">
        {/* Available Coin */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Available coin:</span>
          <span className="badge badge-primary badge-lg font-semibold">
            {coinBalance}
          </span>
        </div>

        <div className="divider divider-horizontal mx-0"></div>

        {/* User Image */}
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-10">
            <span className="text-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        </div>

        {/* User Role */}
        <span className="badge badge-secondary">{user?.role || "USER"}</span>

        {/* User Name */}
        <span className="font-semibold">{user?.name || "User"}</span>
      </div>

      {/* Notification */}
      <div className="flex-none">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell className="w-5 h-5" />
            <span className="badge badge-xs bg-red-500 border-red-500 indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}
