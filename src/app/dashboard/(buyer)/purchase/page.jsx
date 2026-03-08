/**
 * Purchase Coin Page
 * Stripe Checkout integration for buying coin packages
 * Packages: $1, $10, $20, $35
 */

export default function PurchaseCoinPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Purchase Coins</h1>
        <p className="text-base-content/70 mt-2">
          Buy coins to create and manage tasks
        </p>
      </div>

      {/* Coin packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* $1 Package */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">🪙</div>
            <h3 className="card-title">Starter</h3>
            <p className="text-3xl font-bold text-primary">$1</p>
            <p className="text-sm text-base-content/70">10 Coins</p>
            <div className="card-actions mt-4">
              <button className="btn btn-primary btn-sm">Purchase</button>
            </div>
          </div>
        </div>

        {/* $10 Package */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">💰</div>
            <h3 className="card-title">Basic</h3>
            <p className="text-3xl font-bold text-primary">$10</p>
            <p className="text-sm text-base-content/70">100 Coins</p>
            <div className="card-actions mt-4">
              <button className="btn btn-primary btn-sm">Purchase</button>
            </div>
          </div>
        </div>

        {/* $20 Package */}
        <div className="card bg-base-200 shadow-xl border-2 border-primary">
          <div className="badge badge-primary absolute right-2 top-2">Popular</div>
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">💎</div>
            <h3 className="card-title">Pro</h3>
            <p className="text-3xl font-bold text-primary">$20</p>
            <p className="text-sm text-base-content/70">200 Coins</p>
            <div className="card-actions mt-4">
              <button className="btn btn-primary btn-sm">Purchase</button>
            </div>
          </div>
        </div>

        {/* $35 Package */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">👑</div>
            <h3 className="card-title">Premium</h3>
            <p className="text-3xl font-bold text-primary">$35</p>
            <p className="text-sm text-base-content/70">350 Coins</p>
            <div className="card-actions mt-4">
              <button className="btn btn-primary btn-sm">Purchase</button>
            </div>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-bold">About Coins</h3>
          <div className="text-sm">
            Coins are used to create tasks and pay workers. Payments are processed securely via Stripe.
          </div>
        </div>
      </div>
    </div>
  );
}
