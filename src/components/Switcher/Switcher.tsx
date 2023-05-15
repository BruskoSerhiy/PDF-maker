import React, { useState } from "react";
import css from "./Switcher.module.css";

function Switcher() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className={`theme-switch ${theme}`}>
      <input type="checkbox" className="switcherInPDF" onChange={toggleTheme} />
      <span className="toggleCircle"></span>
    </label>
  );
}

export default Switcher;
