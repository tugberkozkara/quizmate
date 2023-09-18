import { useState, useEffect } from 'react';

type TimerProps = {
    timeMax: number,
    timeLeft: number,
    setTimeLeft: (timeLeft: number) => void
}

export const Timer = ({timeMax, timeLeft, setTimeLeft}: TimerProps) => {
    const [barLength, setBarLength] = useState(100/(timeMax/timeLeft));

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
                setBarLength(100/(timeMax/(timeLeft-1)));
            }
            if (barLength <= 70 && barLength > 30) {
                document.getElementById("bar")?.classList.add("bg-warning");
            }
            if (barLength <= 30) {
                document.getElementById("bar")?.classList.replace("bg-warning", "bg-danger");
            }

        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, setTimeLeft, barLength, timeMax]);

  return (
    <>
        <div className="container mt-3 mb-5">
            <div className="progress">
                <div className="progress-bar" id="bar" role="progressbar" style={{"width": `${barLength}%`}} >{timeLeft}</div>
            </div>
        </div>
    </>
  )
}
