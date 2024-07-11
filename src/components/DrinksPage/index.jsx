import { useState } from "react";
// import "./drinks.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import OrderPage from "../OrderPage";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CirclePlus, Copy } from "lucide-react";

// Utility function to format the drink type
const formatOption = (option) => {
  return option.toLowerCase().replace(/\s/g, "-");
};

const DrinksPage = ({addToCart, isDialogOpen, setIsDialogOpen}) => {
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
        
        <div className="wrapper-tea col-span-1 sm:col-start-1 lg:col-start-2 p-4 mx-auto ">
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
        <div className="col-span-1 sm:order-first sm:col-start-1 sm:-mb-10 lg:order-first lg:col-start-1 mx-auto ">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"><CirclePlus className="w-5 h-5 mr-2" /> Select Option</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          
          <DialogTitle>  Select Options</DialogTitle>
          <DialogDescription>
            Customise your drink 
          </DialogDescription>
        </DialogHeader>
        <OrderPage selectedTea={selectedTeaDrink
          .replace(/-/g, " ")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
          selectedCoffee={selectedCoffeeDrink.replace(/-/g, " ")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
          addToCart={addToCart} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
          
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

        <div className="col-span-1 sm:col-start-2 sm:-mt-10 lg:col-start-6 lg:mr-20 pt-8 mx-auto ">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Select Option<CirclePlus className="w-5 h-5 ml-2" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Options</DialogTitle>
          <DialogDescription>
            Customise your drink 
          </DialogDescription>
        </DialogHeader>
        <OrderPage selectedTea={selectedTeaDrink
          .replace(/-/g, " ")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
          selectedCoffee={selectedCoffeeDrink.replace(/-/g, " ")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
          addToCart={addToCart} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
          </div>


        <div className="wrapper-coffee col-span-1 order-first sm:order-second sm:col-start-2 lg:col-start-4 mx-auto">
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

      {/* <OrderPage 
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
      /> */}
    </>
  );
};

export default DrinksPage;
