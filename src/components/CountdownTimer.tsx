import React from "react";
import { useCountdown } from "@/hooks/use-countdown";
import { Timer } from "lucide-react";

export function CountdownTimer() {
  const { minutes, seconds } = useCountdown(15);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-red-600 mb-2">
        <Timer className="w-5 h-5 animate-pulse" />
        <span className="font-semibold text-sm uppercase tracking-wider">Flash Offer Ending In</span>
      </div>
      
      <div className="flex items-center gap-3 text-3xl font-bold font-mono">
        <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-red-100 min-w-[5rem] text-center text-red-700">
          {minutes}
        </div>
        <span className="text-red-400 pb-1">:</span>
        <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-red-100 min-w-[5rem] text-center text-red-700">
          {seconds}
        </div>
      </div>
    </div>
  );
}
