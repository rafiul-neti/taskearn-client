// src/config/dashboardMenu.js
import { 
  Home, List, Send, Landmark, 
  PlusCircle, LayoutList, Coins, History, 
  Users, ShieldCheck 
} from "lucide-react";

export const DASHBOARD_MENU = {
  WORKER: [
    { label: "Home", href: "/dashboard/worker-home", icon: Home },
    { label: "TaskList", href: "/dashboard/worker-tasks", icon: List },
    { label: "My Submissions", href: "/dashboard/submissions", icon: Send },
    { label: "Withdrawals", href: "/dashboard/withdraw", icon: Landmark },
  ],
  BUYER: [
    { label: "Home", href: "/dashboard/buyer-home", icon: Home },
    { label: "Add new Tasks", href: "/dashboard/add-tasks", icon: PlusCircle },
    { label: "My Tasks", href: "/dashboard/added-tasks", icon: LayoutList },
    { label: "Purchase Coin", href: "/dashboard/purchase-coin", icon: Coins },
    { label: "Payment history", href: "/dashboard/buyer-payments", icon: History },
  ],
  ADMIN: [
    { label: "Home", href: "/dashboard/admin-home", icon: Home },
    { label: "Manage Users", href: "/dashboard/users", icon: Users },
    { label: "Manage Task", href: "/dashboard/manage-tasks", icon: ShieldCheck },
  ]
};