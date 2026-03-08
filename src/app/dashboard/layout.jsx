import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { Menu } from "lucide-react";

/**
 * Universal Dashboard Layout
 * Handles shared Navbar and Sidebar for all roles (Buyer, Worker, Admin).
 * Uses DaisyUI Drawer for responsive mobile access.
 */
export default async function DashboardLayout({ children }) {
  // 1. Server-side session check
  const session = await auth();

  // 2. Auth Guard: Redirect to login if no session exists
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* 1. Sticky Navbar - Visible to all dashboard users */}
      <header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/80 backdrop-blur">
        <DashboardNavbar user={session.user} />
      </header>

      {/* 2. DaisyUI Drawer Wrapper */}
      <div className="drawer lg:drawer-open flex-1">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        
        {/* 3. Main Content Area */}
        <div className="drawer-content flex flex-col">
          {/* Mobile Menu Trigger - Hidden on Desktop (lg) */}
          <div className="lg:hidden flex items-center p-4 bg-base-200/50">
            <label htmlFor="dashboard-drawer" className="btn btn-primary btn-sm btn-square lg:hidden">
              <Menu size={20} />
            </label>
            <span className="ml-4 font-bold text-primary capitalize">
              {session.user.role} Panel
            </span>
          </div>

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>

        {/* 4. Responsive Sidebar Side-panel */}
        <div className="drawer-side z-30">
          <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          {/* The DashboardSidebar component already handles role-based 
              link generation internally based on the session prop.
          */}
          <DashboardSidebar session={session} />
        </div>
      </div>
    </div>
  );
}