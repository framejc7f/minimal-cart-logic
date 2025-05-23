
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";
import CartItems from "@/components/CartItems";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

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
    console.log("Removing item with ID:", itemId);
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
    
    toast({
      title: "Товар удален",
      description: "Товар был удален из корзины.",
    });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Ваша корзина пуста</p>
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
            <h2 className="text-xl font-semibold mb-4">Итого заказа</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Подытог</span>
                <span>{total} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Итого</span>
                  <span>{total} ₽</span>
                </div>
              </div>
            </div>
            <Button className="w-full bg-black hover:bg-gray-800">
              Оформить заказ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
