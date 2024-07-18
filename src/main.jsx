import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./components/DrinksPage/drinks.css"; // Import specific css for the DrinksPage if necessary
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <Router>
      <App />
    </Router>
    </ThemeProvider>
  </React.StrictMode>
);
