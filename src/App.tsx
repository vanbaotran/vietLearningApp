import reactLogo from "./assets/react.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const vocabulary = [
    { viet: "xin chao", eng: "hello" },
    { viet: "cho", eng: "dog" },
    { viet: "meo", eng: "cat" },
    { viet: "ca map", eng: "shark" },
    { viet: "ca heo", eng: "dolphin" },
    { viet: "ca voi", eng: "whale" },
    { viet: "tam biet", eng: "bye" },
    { viet: "ban co khoe khong?", eng: "how are you?" },
    { viet: "hen gap lai", eng: "see you again" },
  ];

  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(0);

  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    setCurrent(randomIndex);
  };

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInput(evt.currentTarget.value);
  };

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    if (input.toLowerCase() === vocabulary[current].eng) {
      setStreak(streak + 1);
      setMaxStreak(Math.max(streak + 1, maxStreak));
      setError(false);

      localStorage.setItem("maxStreak", String(Math.max(streak, maxStreak)));
      localStorage.setItem("streak", String(streak + 1));
    } else {
      setStreak(localStorage.streak);
      setMaxStreak(localStorage.streak + 1);

      setError(true);
      setErrorMessage(`Wrong! The correct answer for ${vocabulary[current].viet} is 
          ${vocabulary[current].eng}`);
      console.log("maxStreak", maxStreak);

      localStorage.setItem("streak", String(localStorage.streak));
      localStorage.setItem("maxStreak", String(localStorage.maxStreak));
    }
    setInput("");
    setRandomWord();
  };

  useEffect(() => {
    setRandomWord();
    setStreak(0);
    setMaxStreak(0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 text-white text-center">
      <header className="p-6 mb-8">
        <h1 className="text-2x1 font-bold uppercase">
          Vietnamese vocabulary quiz
        </h1>
        <div>
          <p>
            {streak}/{maxStreak}
          </p>
        </div>
      </header>

      <div className="text-9x1 font-bold mb-8">{vocabulary[current].viet}</div>

      <div className="mb-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="block w-24 mx-auto pb-2 bg-transparent border-b-2 border-b-white outline-none text-center text-6x1"
          />
        </form>
      </div>

      {error && <p className="text-red-500 text-center">{errorMessage}</p>}
    </div>
  );
}

export default App;
