import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingBag, Copy, Truck, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { placeOrder } from '../../service/users';

export default function CartPage({ cartItems, updateCartItem, removeFromCart }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 1) {
      const updatedItem = { ...cartItems[index], quantity: newQuantity };
      updateCartItem(index, updatedItem);
      console.log('Cart item:', cartItems);
    }
  };

  const handlePlaceOrder = async () => {

    const transformedOrder = {
      drinks: cartItems.map(item => ({
        mainProduct: item.mainProduct,
        toppings: item.toppings,
        quantity: item.quantity,
        comment: item.comment,
      })),
      status: "pending",
      is_paid: true
    };
    
    try {
      const response = await placeOrder(transformedOrder);
      console.log('Order placed:', response);
      // You can add more logic here, like navigating to a success page or showing a success message
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{item.mainProduct}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p>Toppings: {item.toppings.map(t => `${t.topping} (${t.quantity})`).join(', ')}</p>
                    <p>Sugar: {item.comment.sugar} ({item.comment.sugarLevel})</p>
                    <p>Ice: {item.comment.iceLevel}</p>
                    {item.comment.content && <p>Note: {item.comment.content}</p>}
                  </div>
                  <div className="flex items-center">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantityChange(index, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      className="w-16 mx-2 text-center"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantityChange(index, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span>${(item.totalPrice * item.quantity).toFixed(2)}</span>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromCart(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
          <Separator className="my-4" />
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4" onClick={handlePlaceOrder}>Proceed to Checkout</Button>
        </>
      )}
    </div>
  );
}