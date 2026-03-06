import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [stepValue, setStepValue] = useState(1);
  const [history, setHistory] = useState([0]);

  const applyCount = (nextCount) => {
    setCount(nextCount);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setCount((c) => c + 1);
      } else if (e.key === "ArrowDown") {
        setCount((c) => c - 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (history[history.length - 1] === count) {
      return;
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistory((prevHistory) => [...prevHistory, count]);
    }
  }, [count, history]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("History", JSON.stringify(history));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  const handleIncrement = () => {
    applyCount(count + +stepValue);
  };

  const handleDecrement = () => {
    applyCount(count - +stepValue);
  };

  const reset = () => {
    setCount(0);
    setHistory([0]);
    localStorage.removeItem("History");
  };

  return (
    <>
      <div
        style={{
          fontFamily: "sans-serif",
          maxWidth: 500,
          margin: "auto",
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 8,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <h2 style={{ textAlign: "center" }}>Counter</h2>

        <div style={{ fontSize: "2em", textAlign: "center", margin: "20px 0" }}>
          Current Count: <span style={{ fontWeight: "bold" }}>{count}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <button style={{ padding: "10px 15px" }} onClick={handleDecrement}>
            Decrement
          </button>
          <button style={{ padding: "10px 15px" }} onClick={handleIncrement}>
            Increment
          </button>
          <button
            style={{
              padding: "10px 15px",
              backgroundColor: "#f44336",
              color: "white",
            }}
            onClick={reset}
          >
            Reset
          </button>
        </div>

        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <label htmlFor="stepInput">Step Value: </label>
          <input
            type="number"
            id="stepInput"
            min={1}
            style={{ padding: 8, width: 60 }}
            value={stepValue}
            onChange={(e) => setStepValue(e.target.value)}
          />
        </div>

        <div
          style={{ marginBottom: 10, textAlign: "center", fontStyle: "italic" }}
        >
          Changes saved.
        </div>

        <div>
          <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: 5 }}>
            Count History:
          </h3>
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: 0,
              maxHeight: 150,
              overflowY: "auto",
            }}
          >
            {history.map((item, index) => (
              <li
                key={index}
                style={{ padding: "3px 0px", borderBottom: "none" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <small style={{ display: "block", textAlign: "center", marginTop: 20 }}>
          Use ArrowUp to increment and ArrowDown to decrement.
        </small>
      </div>
    </>
  );
}

export default App;
