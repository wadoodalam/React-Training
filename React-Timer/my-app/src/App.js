import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from "react";

function App() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [pauseFlag, setPauseFlag] = useState(true);
  const [time, setTime] = useState(0);
  const intervalID = useRef();


  const handleStart = () => {
    setTime((min * 60) + sec);
    setPauseFlag(false);
    
  };

  useEffect(() => {
    intervalID.current = setInterval(() => {
      if (time !== 0 && !pauseFlag) {
        setTime((prevTime) => prevTime - 1);
      } else if (time === 0) {
        clearInterval(intervalID.current);
        setPauseFlag(true);
      }
    }, 100);
    return (() => clearInterval(intervalID.current));
  }, [time, pauseFlag]);


  const handlePauseResume = () => {
    setPauseFlag(!pauseFlag);
  };


  const handleReset = () => {
    setMin(0);
    setSec(0);
    setTime(0);
    setPauseFlag(true);
  };
  const handleInputMin = (e) => {
    if (e.target.value >= 0 && e.target.value <= 99) {
      setMin(parseInt(e.target.value));
    }
  };

  const handleInputSec = (e) => {
    if (e.target.value >= 0 && e.target.value <= 59) {
      setSec(parseInt(e.target.value));
    }
  };

  const outputTimer = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <h1>Timer</h1>
      <span>
        <input type="number" value={min} onChange={handleInputMin} min="0" max="99" disabled={!pauseFlag}></input>
        Minutes
        <input type="number" value={sec} onChange={handleInputSec} min="0" max="59" disabled={!pauseFlag}></input>
        Seconds
        <button onClick={handleStart} disabled={!pauseFlag}>Start</button>
      </span>
      <div>
        <button onClick={handlePauseResume}>Pause/Resume</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <h2>{outputTimer()}</h2>
      </div>

    </div>
  );
}

export default App;
