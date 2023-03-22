import React, { useState } from "react";

import css from "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [step, setStep] = useState(10);

  return (
    <div className={css.root}>
      <h1>Hello World!</h1>
      <div>{step} step</div>
      <button onClick={() => setStep(step + 1)}>Add</button>
      <button onClick={() => setStep(step - 1)}>Remove</button>
      {step > 20 ? <span>Щось багато наклацав</span> : null}
      <input
        type="text"
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="ВВедіть текст"
      />
      <h1>{value}</h1>
      <h2>{value}</h2>
      <h3>{value}</h3>
      <h4>{value}</h4>
      <h5>{value}</h5>
      <h6>{value}</h6>
    </div>
  );
}
export default App;
