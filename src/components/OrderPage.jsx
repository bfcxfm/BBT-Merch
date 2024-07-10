import { Bird, Rabbit, ShoppingCart, Turtle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { getAllProduct, getProductPrice } from "../../service/users"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

export default function OrderPage({ selectedTea, selectedCoffee, addToCart, isDialogOpen, setIsDialogOpen, isCartOpen, setIsCartOpen }) {

  // console.log(selectedCoffee);
  // console.log(mainProduct);

  const navigate = useNavigate();


  const TOPPINGS = [
    { id: 'Bubble', name: 'Bubble' },
    { id: 'Cream', name: 'Cream' },
    { id: 'Gelato', name: 'Gelato' },
    { id: 'Milk Foam', name: 'Milk Foam' },
    { id: 'Fruits', name: 'Fruits' },
  ];
  


  const [currentDrink, setCurrentDrink] = useState({
    toppings: [],
    quantity: 1,
    comment: {
      sugar: 'stevia',
      sugarLevel: '0%',
      iceLevel: 'normal',
      content: '',
      rating: 5
    }
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [mainProductPrice, setMainProductPrice] = useState(0);
  const [toppingPrices, setToppingPrices] = useState({});

  const [mainProduct, setMainProduct] = useState(selectedTea || selectedCoffee);
  const prevTeaRef = useRef(selectedTea);
  const prevCoffeeRef = useRef(selectedCoffee);

  useEffect(() => {
    if (selectedTea !== prevTeaRef.current) {
      setMainProduct(selectedTea);
      prevTeaRef.current = selectedTea;
    } else if (selectedCoffee !== prevCoffeeRef.current) {
      setMainProduct(selectedCoffee);
      prevCoffeeRef.current = selectedCoffee;
    }
  }, [selectedTea, selectedCoffee]);



  useEffect(() => {
    fetchPrices();
  }, [mainProduct]);

  useEffect(() => {
    calculateTotalPrice();
  }, [currentDrink, mainProductPrice, toppingPrices]);

  const fetchPrices = async () => {
    try {
      const mainProductPrice = await getProductPrice(mainProduct);
      setMainProductPrice(mainProductPrice);
      console.log(mainProduct, mainProductPrice);


      const toppingPricesObj = {};
      for (let topping of TOPPINGS) {
        try {
          const toppingPrice = await getProductPrice(topping.name);
          toppingPricesObj[topping.id] = toppingPrice;
        } catch (error) {
          console.error(`Error fetching price for ${topping.name}:`, error);
          toppingPricesObj[topping.id] = 0; // Set a default price if fetching fails
        }
      }
      setToppingPrices(toppingPricesObj);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };



  const calculateTotalPrice = () => {
    let total = mainProductPrice * currentDrink.quantity;
    currentDrink.toppings.forEach(topping => {
      total += (toppingPrices[topping.topping] || 0) * topping.quantity * currentDrink.quantity;
    });
    setTotalPrice(total);
  };

  const resetDrink = () => {
    setCurrentDrink({
      toppings: [],
      quantity: 1,
      comment: {
        sugar: 'stevia',
        sugarLevel: '0%',
        iceLevel: 'normal',
        content: '',
        rating: 5
      }
    });
  };

  const updateDrink = (field, value) => {
    setCurrentDrink(prevDrink => ({
      ...prevDrink,
      [field]: value
    }));
  };

  const updateComment = (field, value) => {
    setCurrentDrink(prevDrink => ({
      ...prevDrink,
      comment: {
        ...prevDrink.comment,
        [field]: value
      }
    }));
  };

  const toggleTopping = (toppingId) => {
    setCurrentDrink(prevDrink => {
      const toppingIndex = prevDrink.toppings.findIndex(t => t.topping === toppingId);
      let newToppings;
      
      if (toppingIndex > -1) {
        newToppings = prevDrink.toppings.filter(t => t.topping !== toppingId);
      } else {
        newToppings = [...prevDrink.toppings, { topping: toppingId, quantity: 1 }];
      }
      
      return { ...prevDrink, toppings: newToppings };
    });
  };

  const updateToppingQuantity = (toppingId, quantity) => {
    setCurrentDrink(prevDrink => {
      const newToppings = prevDrink.toppings.map(t => 
        t.topping === toppingId ? { ...t, quantity } : t
      );
      return { ...prevDrink, toppings: newToppings };
    });
  };

  const handleAddToCart = () => {
    const drinkToAdd = {
      mainProduct,
      ...currentDrink,
      totalPrice
    };
    console.log(drinkToAdd);
    addToCart(drinkToAdd);
    resetDrink();
    setIsDialogOpen(false);
    // setIsCartOpen(true);
    // navigate('/cart'); 
  };

  return (
    <div
      className="relative  flex-col items-start gap-8 md:flex"
    >
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Order Details for {mainProduct}</legend>


            <div className="grid gap-3">
              <Label>Toppings</Label>
              <div className="grid grid-cols-2 gap-5">
                {TOPPINGS.map((topping) => (
                  <div key={topping.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`${topping.id}`}
                      checked={currentDrink.toppings.some(t => t.topping === topping.id)}
                      onCheckedChange={() => toggleTopping(topping.id)}
                    />
                    <Label htmlFor={`${topping.id}`}>{topping.name}</Label>
                    {currentDrink.toppings.some(t => t.topping === topping.id) && (
                      <Input
                        type="number"
                        value={currentDrink.toppings.find(t => t.topping === topping.id).quantity}
                        onChange={(e) => updateToppingQuantity(topping.id, parseInt(e.target.value))}
                        min={1}
                        className="w-16 h-5 ml-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity"
                type="number" 
                value={currentDrink.quantity}
                onChange={(e) => updateDrink('quantity', parseInt(e.target.value))}
                min={1}
              />
            </div>

            <div className="grid gap-3">
              <Label>Customization</Label>
              <Select 
                value={currentDrink.comment.sugar}
                onValueChange={(value) => updateComment('sugar', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sugar type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="honey">Honey</SelectItem>
                  <SelectItem value="stevia">Stevia</SelectItem>
                </SelectContent>
              </Select>
              {currentDrink.comment.sugar !== "none" && (
              <Select 
                value={currentDrink.comment.sugarLevel}
                onValueChange={(value) => updateComment('sugarLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sugar level" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="0%">0%</SelectItem>
                  <SelectItem value="25%">25%</SelectItem>
                  <SelectItem value="50%">50%</SelectItem>
                  <SelectItem value="75%">75%</SelectItem>
                  <SelectItem value="100%">100%</SelectItem>
                </SelectContent>
              </Select>)}
              <Select 
                value={currentDrink.comment.iceLevel}
                onValueChange={(value) => updateComment('iceLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ice level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal Ice</SelectItem>
                  <SelectItem value="less">Less Ice</SelectItem>
                  <SelectItem value="little">Little Ice</SelectItem>
                  <SelectItem value="none">No Ice</SelectItem>
                </SelectContent>
              </Select>
              <Textarea 
                placeholder="Additional comments..."
                value={currentDrink.comment.content}
                onChange={(e) => updateComment('content', e.target.value)}
              />
            </div>

            <div className="grid gap-3">
            <Label>Total Price</Label>
            <Input 
              type="text" 
              value={`$${totalPrice.toFixed(2)}`}
              readOnly
            />
          </div>

          <Button type="button" onClick={handleAddToCart} className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
        </fieldset>
      </form>
    </div>
  )
}
