"use client";

import NavLink from "@/components/Navbar/NavLink";
import Link from "next/link";
import { 
  Home, 
  ClipboardCheck, 
  PlusCircle, 
  ListTodo, 
  Coins, 
  Receipt 
} from "lucide-react";

/**
 * Buyer Dashboard Sidebar
 * Navigation sidebar with role-specific links
 * Uses NavLink component with lucide-react icons
 */

const menuItems = [
  {
    label: "Home",
    href: "/dashboard/buyer",
    icon: Home
  },
  {
    label: "Task To Review",
    href: "/dashboard/buyer/review",
    icon: ClipboardCheck
  },
  {
    label: "Add Task",
    href: "/dashboard/buyer/tasks/new",
    icon: PlusCircle
  },
  {
    label: "My Tasks",
    href: "/dashboard/buyer/tasks",
    icon: ListTodo
  },
  {
    label: "Purchase Coin",
    href: "/dashboard/buyer/purchase",
    icon: Coins
  },
  {
    label: "Payment History",
    href: "/dashboard/buyer/payments",
    icon: Receipt
  }
];

export default function BuyerSidebar({ user }) {
  return (
    <aside className="bg-base-200 w-64 border-r border-base-300 flex flex-col">
      {/* Navigation menu */}
      <ul className="menu p-4 gap-1 flex-1">
        {menuItems.map((item) => (
          <li key={item.href}>
            <NavLink
              href={item.href}
              icon={item.icon}
              variant="ghost"
              className="justify-start"
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Sidebar footer */}
      <div className="p-4 border-t border-base-300">
        <Link
          href="/"
          className="btn btn-outline btn-sm w-full"
        >
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
