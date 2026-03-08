// src/config/dashboardMenu.js
import { 
  Home, List, Send, Landmark, 
  PlusCircle, LayoutList, Coins, History, 
  Users, ShieldCheck 
} from "lucide-react";

export const DASHBOARD_MENU = {
  WORKER: [
    { label: "Home", href: "/dashboard/worker", icon: Home },
    { label: "TaskList", href: "/dashboard/worker/tasks", icon: List },
    { label: "My Submissions", href: "/dashboard/worker/submissions", icon: Send },
    { label: "Withdrawals", href: "/dashboard/worker/withdraw", icon: Landmark },
  ],
  BUYER: [
    { label: "Home", href: "/dashboard/buyer", icon: Home },
    { label: "Add new Tasks", href: "/dashboard/buyer/new-tasks", icon: PlusCircle },
    { label: "My Tasks", href: "/dashboard/buyer/tasks", icon: LayoutList },
    { label: "Purchase Coin", href: "/dashboard/buyer/purchase", icon: Coins },
    { label: "Payment history", href: "/dashboard/buyer/payments", icon: History },
  ],
  ADMIN: [
    { label: "Home", href: "/dashboard/admin", icon: Home },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Manage Task", href: "/dashboard/admin/tasks", icon: ShieldCheck },
  ]
};