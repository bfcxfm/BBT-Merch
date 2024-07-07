import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import DrinksPage from "./components/DrinksPage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/AdminPage";
import { TooltipProvider } from "./components/ui/tooltip";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const isRootPath = location.pathname === "/";
  const [user, setUser] = useState(null);

  return (
    <div className="flex flex-col">
      {isRootPath && <NavBar />} {/* Always include NavBar at the top */}
      <div className="flex flex-1 flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid  grid-cols-4 gap-4">
                <div className="mt-4 col-span-4">
                  <DrinksPage />
                </div>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="grid  grid-cols-4 gap-4">
                <div className="mt-4 col-span-4">
                  <LoginForm />
                </div>
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="grid  grid-cols-4 gap-4">
                <div className="mt-4 col-span-4">
                  <SignUpForm />
                </div>
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/admin"
            element={
              <div className="col-span-4">
                <TooltipProvider>
                  <Dashboard />
                </TooltipProvider>
              </div>
            }
          />
          <Route
            path="/user"
            element={
              <div className="col-span-4">
                <TooltipProvider>
                  <UserPage />
                </TooltipProvider>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
