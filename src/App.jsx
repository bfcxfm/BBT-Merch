import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import DrinksPage from "./components/DrinksPage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/AdminPage";
import { TooltipProvider } from "./components/ui/tooltip";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage";
import { getAdmin, getUser } from "../service/users";
import OrderPage from "./components/OrderPage";
import CartPage from "./components/CartPage";

function App() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";
  const [user, setUser] = useState(getUser);

  const [admin, setAdmin] = useState(getAdmin);

  function PrivateRoute({ children, admin }) {
    return admin ? children : <Navigate to="/admin" replace />;
  }

  
  // useEffect(() => {
  //   const fetchedUser = getUser(); // You can replace this with an API call if needed
  //   setUser(fetchedUser);
  // }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);  // State to control the cart sheet
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // State to control the dialog

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setIsDialogOpen(false); // Close dialog after adding to cart
    setIsCartOpen(true);    // Open cart sheet
  };

  const updateCartItem = (index, updatedItem) => {
    const newCartItems = [...cartItems];
    newCartItems[index] = updatedItem;
    setCartItems(newCartItems);
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };
  

  return (
    <div className="flex flex-col">
      {isRootPath && <NavBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cartItems={cartItems}
                updateCartItem={updateCartItem}
                removeFromCart={removeFromCart}
                addToCart={addToCart} setCartItems={setCartItems}/>} {/* Always include NavBar at the top */}
      <div className="flex flex-1 flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid  grid-cols-4 gap-4">
                <div className="mt-4 col-span-4">
                  <DrinksPage addToCart={addToCart} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>
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
          <Route
            path="/order"
            element={
              <div className="col-span-4">
                <TooltipProvider>
                <OrderPage />
                </TooltipProvider>
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <div className="col-span-4">
                <TooltipProvider>
                <CartPage 
                cartItems={cartItems}
                updateCartItem={updateCartItem}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
              />
                </TooltipProvider>
              </div>
            }
          />
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
