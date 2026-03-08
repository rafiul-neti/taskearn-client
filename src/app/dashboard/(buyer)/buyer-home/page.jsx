import { auth } from "@/auth";

/**
 * Buyer Dashboard Home Page
 * Displays buyer statistics and overview
 */

export default async function BuyerDashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name}!</h1>
        <p className="text-base-content/70 mt-2">
          Here's an overview of your buyer account
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Tasks</div>
            <div className="stat-value text-primary">0</div>
            <div className="stat-desc">Tasks created</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Active Tasks</div>
            <div className="stat-value text-secondary">0</div>
            <div className="stat-desc">Currently running</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Pending Reviews</div>
            <div className="stat-value text-warning">0</div>
            <div className="stat-desc">Awaiting your review</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Coin Balance</div>
            <div className="stat-value text-success">0</div>
            <div className="stat-desc">Available coins</div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <a href="/dashboard/buyer/tasks/new" className="btn btn-primary">
              Create New Task
            </a>
            <a href="/dashboard/buyer/review" className="btn btn-secondary">
              Review Submissions
            </a>
            <a href="/dashboard/buyer/purchase" className="btn btn-accent">
              Purchase Coins
            </a>
          </div>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Activity</h2>
          <div className="text-center py-8 text-base-content/70">
            <p>No recent activity</p>
            <p className="text-sm mt-2">Your recent tasks and submissions will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
