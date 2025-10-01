import { useEffect, useState } from "react";
import DotCanvas from "./animation/DotCanvas";

function App() {
  const targetDate = new Date("2026-01-01T00:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className=" min-h-screen px-4 bg-base-200 text-center relative">
      <DotCanvas />

      <div className="z-10 relative flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10">
          Tentechs Launches In
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center p-4 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                <span style={{ "--value": item.value }}>{item.value}</span>
              </span>
              <span className="mt-2 text-sm sm:text-base md:text-lg">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
