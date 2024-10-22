import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutsContextProvider } from "./context/WorkoutContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </StrictMode>
);
