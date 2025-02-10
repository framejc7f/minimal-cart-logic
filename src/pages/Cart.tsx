
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";
import CartItems from "@/components/CartItems";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  const updateQuantity = (itemId: number, change: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (itemId: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems 
              items={cartItems} 
              subtotal={total} 
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          </div>
          <div className="bg-white p-6 rounded-lg border h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
            <Button className="w-full bg-black hover:bg-gray-800">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
