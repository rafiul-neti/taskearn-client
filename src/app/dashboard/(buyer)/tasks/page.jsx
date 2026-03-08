/**
 * My Tasks Page
 * List of all tasks created by the buyer
 */

export default function MyTasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-base-content/70 mt-2">
            Manage all your created tasks
          </p>
        </div>
        <a href="/dashboard/add-tasks" className="btn btn-primary">
          Create New Task
        </a>
      </div>

      {/* Empty state */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
            <p className="text-base-content/70 mb-4">
              Create your first task to get started
            </p>
            <a href="/dashboard/buyer/tasks/new" className="btn btn-primary">
              Create Task
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
