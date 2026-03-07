/**
 * Payment History Page
 * List of all coin purchases made by the buyer
 */

export default function PaymentHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-base-content/70 mt-2">
          View all your coin purchase transactions
        </p>
      </div>

      {/* Empty state */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">No payment history</h3>
            <p className="text-base-content/70 mb-4">
              Your coin purchase history will appear here
            </p>
            <a href="/dashboard/buyer/purchase" className="btn btn-primary">
              Purchase Coins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
