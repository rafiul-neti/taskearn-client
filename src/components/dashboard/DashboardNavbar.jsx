"use client";

import { Bell, Coins, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardNavbar({ user, coinBalance = 0 }) {
  const userProfile = (
    <>
      <Image
        src={`${user?.image ? user.image : "/placeholder.jpg"}`}
        alt="User Profile"
        width={50}
        height={50}
        className="rounded-full"
      />
    </>
  );

  return (
    <div className="navbar justify-between bg-base-200 border-b border-base-300 px-4 lg:px-7 py-0 lg:py-5">
      {/* 1. Logo - Always Visible */}
      <div className="flex-1 lg:flex-none lg:w-48">
        <Link href={`/`} className="text-2xl lg:text-4xl font-bold lg:font-extrabold text-primary">
          TaskEarn
        </Link>
      </div>

      {/* 2. Desktop Center: User Info (Hidden on Mobile) */}
      <div className="hidden lg:flex items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <button className="btn bg-[#41ff6b1a] flex items-center gap-3 font-bold text-xl rounded-full px-5">
            <span>{coinBalance}</span>{" "}
            <Image src="/coin.png" alt="" width={20} height={20} />
          </button>
        </div>

        <div className="divider divider-horizontal mx-0"></div>

        <div className="flex items-center gap-2">
          {userProfile}

          <div className="">
          <span className="font-semibold block">{user?.name || "User"}</span>
            <small className="bg-secondary text-white px-1 rounded">{user?.role || "USER"}</small>
          </div>
        </div>
      </div>

      {/* 3. Mobile/Desktop Right Actions */}
      <div className="flex-none flex items-center gap-2">
        {/* Mobile Dropdown (Hidden on Desktop) */}
        <div className="dropdown dropdown-end lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            {userProfile}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-4 shadow-xl bg-base-100 rounded-box w-64 border border-base-300"
          >
            <li className="menu-title text-primary uppercase text-xs font-bold tracking-widest">
              User Profile
            </li>
            <div className="py-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-60">Name</span>
                <span className="font-bold">{user?.name || "User"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-60">Role</span>
                <span className="badge badge-secondary badge-sm">
                  {user?.role || "USER"}
                </span>
              </div>
              <div className="divider my-0"></div>
              <div className="flex items-center justify-between bg-primary/10 p-2 rounded-lg">
                <div className="flex items-center gap-2 text-primary">
                  <Coins size={16} />
                  <span className="text-xs font-bold">Coins</span>
                </div>
                <span className="font-black text-primary">{coinBalance}</span>
              </div>
            </div>
          </ul>
        </div>

        {/* Notification Bell - Always Visible */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell className="w-8 h-8" />
            <span className="badge badge-xs bg-red-500 border-red-500 indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}
