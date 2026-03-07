import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isBuyer } from "@/lib/auth-utils";
import BuyerSidebar from "@/components/dashboard/BuyerSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

/**
 * Buyer Dashboard Layout
 * Navbar at top (full width), sidebar on left below navbar
 * Role protected: BUYER only
 */

export default async function BuyerLayout({ children }) {
  // Get session on server side
  const session = await auth();

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/buyer");
  }

  // Redirect if not a buyer
  if (!isBuyer(session)) {
    const dashboardRoutes = {
      WORKER: "/dashboard/worker",
      ADMIN: "/dashboard/admin"
    };
    redirect(dashboardRoutes[session.user.role] || "/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dashboard Navbar - Full Width */}
      <DashboardNavbar user={session.user} coinBalance={0} />

      {/* Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <BuyerSidebar user={session.user} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 bg-base-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
