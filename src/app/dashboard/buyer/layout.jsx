import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isBuyer } from "@/lib/auth-utils";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { Menu } from "lucide-react";

/**
 * Buyer Dashboard Layout
 * Navbar at top (full width), responsive sidebar with drawer
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
      <div className="sticky top-0 z-50">
        <DashboardNavbar user={session.user} coinBalance={0} />
      </div>

      {/* Drawer Layout for Responsive Sidebar */}
      <div className="drawer lg:drawer-open flex-1">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        
        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Mobile Menu Button */}
          <div className="lg:hidden p-4 bg-base-100">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <Menu size={24} />
            </label>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8 bg-base-100">
            {children}
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <DashboardSidebar session={session} />
        </div>
      </div>
    </div>
  );
}
