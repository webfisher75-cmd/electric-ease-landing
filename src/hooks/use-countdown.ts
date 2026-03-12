import { useState, useEffect } from "react";

export function useCountdown(initialMinutes: number = 15) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return initialMinutes * 60; // reset when reaching 0
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
    isComplete: timeLeft === 0,
  };
}
