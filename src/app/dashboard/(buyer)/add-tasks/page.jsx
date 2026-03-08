import { PlusCircle, Lightbulb, Calculator, Zap, Calendar as CalendarIcon } from "lucide-react";
import AddTaskForm from "@/components/forms/AddTaskForm";

export default function AddTaskPage() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* 1. Slim, Modern Header */}
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Zap size={16} className="fill-current" />
          <span className="text-xs font-bold uppercase tracking-widest">Buyer Portal</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-base-content">
          Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">New Task</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Area (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="bg-base-100 rounded-3xl shadow-sm border border-base-300 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
            <div className="py-8 px-3">
              <AddTaskForm />
            </div>
          </div>
        </div>

        {/* Sidebar Info Area (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="alert bg-primary/5 border-primary/20 rounded-2xl">
            <Calculator className="text-primary" size={24} />
            <div>
              <h3 className="font-bold">Live Budgeting</h3>
              <div className="text-xs">Your total investment is calculated automatically in the form footer.</div>
            </div>
          </div>
          

          {/* Smart Tip Section */}
          <div className="collapse bg-base-100 border border-base-300 rounded-2xl">
            <input type="checkbox" defaultChecked /> 
            <div className="collapse-title font-bold flex items-center gap-2">
              <Lightbulb className="text-warning" size={18} /> Optimization Tips
            </div>
            <div className="collapse-content text-sm text-base-content/70">
              <p>Tasks with <strong>image proofs</strong> are verified 40% faster by workers in Bangladesh.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}