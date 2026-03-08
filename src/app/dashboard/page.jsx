import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardGatekeeper() {
  const session = await auth();
  const role = session?.user?.role;

  // Logic: Send them to their specific home based on role
  if (role === "BUYER") redirect("/dashboard/buyer-home");
  if (role === "WORKER") redirect("/dashboard/worker-home");
  if (role === "ADMIN") redirect("/dashboard/admin-home");

  redirect("/login");
}