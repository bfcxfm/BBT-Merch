import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import DrinksPage from "./components/DrinksPage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/AdminPage";
import { TooltipProvider } from "./components/ui/tooltip";
import { Route, Routes } from "react-router-dom";
import OrderPage from "./components/OrderPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="grid grid-rows-5 grid-cols-5 gap-4">
      <Routes>
        <Route
          path="/admin"
          element={
            <div className="col-span-5">
              <TooltipProvider>
                <Dashboard />
              </TooltipProvider>
            </div>
          }
        />
        <Route
          path="/user"
          element={
            <div className="col-span-5">
              <TooltipProvider>
                <OrderPage />
              </TooltipProvider>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className="row-start-1 col-span-2">
                <LoginForm />
              </div>
              <div className="row-start-1 col-start-3 col-span-2">
                <SignUpForm />
              </div>
              <div className="row-start-2 col-span-5">
                <DrinksPage />
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
