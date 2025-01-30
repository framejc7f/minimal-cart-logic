import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartItemsCount(totalItems);

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newTotalItems = updatedCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartItemsCount(newTotalItems);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    toast({
      title: "Order placed successfully!",
      description: "We will contact you soon to confirm the delivery.",
    });
    setIsCartOpen(false);
    // Clear cart after successful order
    localStorage.setItem("cart", "[]");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Store
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete your order</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Cart Items</h4>
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Phone number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                placeholder="Delivery address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;