"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  FileText,
  ListChecks,
  Image as ImageIcon,
  Link as LinkIcon,
  Coins,
  Users,
  Calendar,
  Save,
  Send,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
} from "lucide-react";

export default function AddTaskForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      instructions: "",
      proofType: "IMAGE",
      rewardAmount: "",
      totalSlots: "",
      deadline: "",
      status: "DRAFT",
    },
  });

  // Watch values for the Preview step and Budget
  const formData = watch();
  const total =
    formData.rewardAmount && formData.totalSlots
      ? (
          parseFloat(formData.rewardAmount) * parseInt(formData.totalSlots)
        ).toFixed(2)
      : "0.00";

  const nextStep = async () => {
    // Validate only the fields in the current step before moving forward
    const fields = {
      1: ["title", "description"],
      2: ["proofType", "instructions"],
      3: ["rewardAmount", "totalSlots", "deadline"],
    };

    const isValid = await trigger(fields[step]);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data, isDraft = false) => {
    // ... your existing submission logic ...
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      {/* STEPS INDICATOR (DaisyUI) */}
      <ul className="steps w-full mb-8">
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Info</li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>
          Requirements
        </li>
        <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Budget</li>
        <li className={`step ${step >= 4 ? "step-primary" : ""}`}>Preview</li>
      </ul>

      <form className="min-h-[400px]">
        {/* STEP 1: BASIC INFO */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-2 border-b border-base-300 pb-2 text-primary">
              <FileText size={20} />
              <h2 className="font-bold uppercase tracking-widest text-sm">
                Step 1: Basic Details
              </h2>
            </div>
            <div className="form-control w-full">
              <label className="label block">
                <span className="label-text font-bold">Task Title</span>
              </label>
              <input
                type="text"
                className="input w-full input-bordered rounded-xl"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-error text-xs mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label block">
                <span className="label-text font-bold">Description</span>
              </label>
              <textarea
                className="textarea w-full textarea-bordered h-32 rounded-xl"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </div>
          </div>
        )}

        {/* STEP 2: PROOF & INSTRUCTIONS */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-2 border-b border-base-300 pb-2 text-secondary">
              <ListChecks size={20} />
              <h2 className="font-bold uppercase tracking-widest text-sm">
                Step 2: Requirements
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["IMAGE", "LINK", "BOTH"].map((type) => (
                <label key={type} className="cursor-pointer group">
                  <input
                    type="radio"
                    value={type}
                    className="peer hidden"
                    {...register("proofType")}
                  />
                  <div className="flex flex-col items-center p-6 bg-base-200/50 border-2 border-transparent rounded-2xl peer-checked:border-primary peer-checked:bg-base-100 transition-all">
                    {type === "IMAGE" ? (
                      <ImageIcon size={24} />
                    ) : type === "LINK" ? (
                      <LinkIcon size={24} />
                    ) : (
                      <Sparkles size={24} />
                    )}
                    <span className="font-bold mt-2">{type}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="form-control">
              <label className="label block">
                <span className="label-text font-bold">Instructions</span>
              </label>
              <textarea
                className="textarea w-full textarea-bordered h-40 rounded-xl"
                {...register("instructions", { required: true })}
              />
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET & DEADLINE */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-2 border-b border-base-300 pb-2 text-accent">
              <Coins size={20} />
              <h2 className="font-bold uppercase tracking-widest text-sm">
                Step 3: Budget
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block">
                  <span className="label-text font-bold">Reward (Coins)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="input w-full input-bordered font-bold"
                  {...register("rewardAmount", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label block">
                  <span className="label-text font-bold">Worker Slots</span>
                </label>
                <input
                  type="number"
                  className="input w-full input-bordered font-bold"
                  {...register("totalSlots", { required: true })}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label block">
                <span className="label-text font-bold">Deadline</span>
              </label>
              <input
                type="date"
                min={today}
                className="input w-full input-bordered font-bold"
                {...register("deadline", { required: true })}
              />
            </div>
          </div>
        )}

        {/* STEP 4: PREVIEW SECTION */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 border-b border-base-300 pb-2 text-primary">
              <Eye size={20} />
              <h2 className="font-bold uppercase tracking-widest text-sm">
                Step 4: Preview & Confirm
              </h2>
            </div>

            <div className="bg-base-200/50 rounded-3xl p-6 space-y-4 border border-base-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase">
                    Title
                  </p>
                  <p className="font-bold">{formData.title}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase">
                    Proof Type
                  </p>
                  <span className="badge badge-primary">
                    {formData.proofType}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black opacity-40 uppercase">
                  Instructions Summary
                </p>
                <p className="text-sm line-clamp-2 italic text-base-content/70">
                  {formData.instructions}
                </p>
              </div>

              <div className="divider opacity-10"></div>

              {/* BUDGET CALCULATION PREVIEW */}
              <div className="flex flex-col md:flex-row items-center justify-between bg-base-100 p-4 rounded-2xl border border-base-300">
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase">
                    Total Investment
                  </p>
                  <p className="text-3xl font-black text-primary">
                    {total} <span className="text-xs">COINS</span>
                  </p>
                </div>
                <div className="text-right text-sm opacity-60">
                  <p>
                    {formData.rewardAmount} x {formData.totalSlots} Slots
                  </p>
                  <p>Expires: {formData.deadline}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="grid grid-cols-12 gap-5 items-center mt-10 pt-6 border-t border-base-300">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="col-span-3 btn btn-outline gap-2"
            >
              <ArrowLeft size={18} /> Back
            </button>
          ) : (
            ""
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className={`${step === 1 ? "col-span-12" : "col-span-9"} btn btn-primary whitespace-nowrap px-10 rounded-xl gap-2`}
            >
              Next Step <ArrowRight size={18} />
            </button>
          ) : (
            <div className="col-span-9 flex gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSubmit((data) => onSubmit(data, true))}
                className="btn btn-outline whitespace-nowrap flex-1 sm:px-8"
              >
                <Save size={18} /> Save Draft
              </button>
              <button
                type="button"
                onClick={handleSubmit((data) => onSubmit(data, false))}
                className="btn btn-primary whitespace-nowrap flex-1 sm:px-10 bg-linear-to-r from-primary to-secondary border-none text-white shadow-lg"
              >
                <Send size={18} /> Launch Task
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
