import { useState } from "react";
// import "./drinks.css";

// Utility function to format the drink type
const formatOption = (option) => {
  return option.toLowerCase().replace(/\s/g, "-");
};

const DrinksPage = () => {
  const [selectedDrink, setSelectedDrink] = useState("milk-tea");

  const drinkOptions = [
    "Tea",
    "Cheese Tea",
    "Fruits Tea",
    "Milk Tea",
    "Milk Tea with toppings",
    "Milk Tea with ice cream",
    "Yuan Yang",
    "Black",
    "Americano",
    "Latte",
    "Mocha",
    "Macchiato",
    "Affogato",
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
    <div className="drinks-page grid grid-cols-4 gap-4">
      <div className="wrapper col-start-1 col-span-2 p-4">
        <div className="shadow"></div>
        <div className="title capitalize">
          {selectedDrink.replace(/-/g, " ")}
        </div>
        <div className={`cup ${selectedDrink}`}>
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

      <div className="options col-start-3 col-span-1 p-4 overflow-auto">
        {drinkOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedDrink(formatOption(option));
            }}
            className={`cursor-pointer py-2 ${
              formatOption(option) === selectedDrink ? "selected" : ""
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinksPage;
