import React, { useState, useEffect } from "react";
import "./loading.scss";

const Loading = () => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer =
      seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className="quiz-container">
      <div className="loading-circle">
        <span>{seconds}</span>
      </div>
      <p>Quiz starting in...</p>
    </div>
  );
};

export default Loading;
