import { useState } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div
      style={{
        padding: "20px",
        background: dark ? "#121212" : "#ffffff",
        color: dark ? "#ffffff" : "#000000",
        minHeight: "100vh",
      }}
    >
      <h1>AI Sales Forecasting Dashboard</h1>

      <button onClick={() => setDark(!dark)}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <Dashboard dark={dark} />
    </div>
  );
}

export default App;
