/**
 * Task To Review Page
 * Manual review queue for buyer to approve/reject submissions
 */

export default function TaskToReviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Task To Review</h1>
        <p className="text-base-content/70 mt-2">
          Review and approve worker submissions
        </p>
      </div>

      {/* Empty state */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No submissions to review</h3>
            <p className="text-base-content/70">
              Worker submissions will appear here for your review
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
