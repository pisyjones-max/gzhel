"use client";
import { usePlan } from "@/lib/usePlan";

export default function PlanButton({ id, className = "" }: { id: string; className?: string }) {
  const { ids, toggle } = usePlan();
  const on = ids.includes(id);
  return (
    <button onClick={() => toggle(id)} aria-pressed={on}
      className={`border px-4 py-2 text-sm font-semibold ${on ? "border-cobalt bg-cobalt text-white" : "border-glow/40 text-mist hover:bg-navy"} ${className}`}>
      {on ? "В плане ✓" : "В мой план"}
    </button>
  );
}
