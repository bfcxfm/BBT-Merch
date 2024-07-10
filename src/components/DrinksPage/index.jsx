import { useState } from "react";
// import "./drinks.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import OrderPage from "../OrderPage";

// Utility function to format the drink type
const formatOption = (option) => {
  return option.toLowerCase().replace(/\s/g, "-");
};

const DrinksPage = ({addToCart}) => {
  const [selectedTeaDrink, setSelectedTeaDrink] = useState("milk-tea");
  const [selectedCoffeeDrink, setSelectedCoffeeDrink] = useState("latte");
  // const [selectedDrink, setSelectedDrink] = useState("milk-tea");

  // const handleAddToCart = (item) => {
  //   setCartItems([...cartItems, item]);
  // };

  const teaOptions = [
    "TEA",
    "CHEESE TEA",
    "FRUITS TEA",
    "MILK TEA",
    "MILK TEA WITH TOPPINGS",
    "MILK TEA WITH ICE CREAM",
    "YUAN YANG",
    // "Black",
    // "Americano",
    // "Latte",
    // "Mocha",
    // "Macchiato",
    // "Affogato",
    // "Cappuccino",
    // "Flat White",
    // "Espresso",
    // "Doppio",
    // "Cortado",
    // "Con Panna",
    // "Irish",
    // "Cafe Au Lait",
    // Repeats
    // "Black",
    // "Flat White",
    // "Latte",
    // "Cappuccino",
    // "Americano",
    // "Espresso",
    // "Doppio",
    // "Cortado",
  ];

  const coffeeOptions = [
    // "Tea",
    // "Cheese Tea",
    // "Fruits Tea",
    // "Milk Tea",
    // "Milk Tea with toppings",
    // "Milk Tea with ice cream",
    // "Yuan Yang",
    "BLACK",
    "AMERICANO",
    "LATTE",
    "MOCHA",
    "MACCHIATO",
    "AFFOGATO",
    // "Cappuccino",
    // "Flat White",
    // "Espresso",
    // "Doppio",
    // "Cortado",
    // "Con Panna",
    // "Irish",
    // "Cafe Au Lait",
    // Repeats
    // "Black",
    // "Flat White",
    // "Latte",
    // "Cappuccino",
    // "Americano",
    // "Espresso",
    // "Doppio",
    // "Cortado",
  ];

  return (
    <>
      <div className=" drinks-page tea-bg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mx-auto pb-4 pt-4 items-center justify-center">
        <div className="wrapper-tea col-span-1 lg:col-start-2 p-4 mx-auto ">
          <div className="shadow"></div>
          <div className="title capitalize">
            {selectedTeaDrink.replace(/-/g, " ")}
          </div>
          <div className={`cup ${selectedTeaDrink}`}>
            <div className="contents">
              <div className="gelato">gelato</div>
              <div className="foam">milk foam</div>
              <div className="cream">cream</div>
              <div className="steamed-milk">steamed milk</div>
              <div className="milk">milk</div>
              <div className="chocolate">chocolate</div>
              <div className="sugar">sugar</div>
              <div className="whiskey">whiskey</div>
              <div className="water">water</div>
              <div className="coffee">coffee</div>
              <div className="tea">tea</div>
              <div className="topping">topping</div>
              <div className="fruits">fruits</div>
              <div className="espresso">
                <span>(2)&nbsp;</span>espresso
              </div>
            </div>
          </div>
        </div>

        <div className="options-tea col-span-1 sm:col-start-2 lg:col-start-4  overflow-auto flex justify-center items-center mx-auto">
          {teaOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedTeaDrink(formatOption(option));
              }}
              className={`cursor-pointer py-2 ${
                formatOption(option) === selectedTeaDrink ? "selected" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="drinks-page coffee-bg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mx-auto pb-4 pt-4 items-center justify-center">
        <div className="options-coffee col-span-1 lg:col-start-2 mx-auto overflow-auto order-last sm:order-first flex justify-center items-center">
          {coffeeOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCoffeeDrink(formatOption(option));
              }}
              className={`cursor-pointer py-2 ${
                formatOption(option) === selectedCoffeeDrink ? "selected" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="wrapper-coffee col-span-1 order-first sm:order-last sm:col-start-2 lg:col-start-4 mx-auto">
          <div className="shadow"></div>
          <div className="title capitalize">
            {selectedCoffeeDrink.replace(/-/g, " ")}
          </div>
          <div className={`cup ${selectedCoffeeDrink}`}>
            <div className="contents">
              <div className="gelato">gelato</div>
              <div className="foam">milk foam</div>
              <div className="cream">cream</div>
              <div className="steamed-milk">steamed milk</div>
              <div className="milk">milk</div>
              <div className="chocolate">chocolate</div>
              <div className="sugar">sugar</div>
              <div className="whiskey">whiskey</div>
              <div className="water">water</div>
              <div className="coffee">coffee</div>
              <div className="tea">tea</div>
              <div className="topping">topping</div>
              <div className="fruits">fruits</div>
              <div className="espresso">
                <span>(2)&nbsp;</span>espresso
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderPage 
        selectedTea={selectedTeaDrink
          .replace(/-/g, " ")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
        selectedCoffee={selectedCoffeeDrink.replace(/-/g, " ")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
          addToCart={addToCart}
      />
    </>
  );
};

export default DrinksPage;
