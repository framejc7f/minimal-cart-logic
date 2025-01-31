import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";
import CartDialog from "./CartDialog";

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Store
          </Link>
          <div className="flex items-center gap-4">
            <CartButton cartItemsCount={cartItemsCount} onClick={() => setIsCartOpen(true)} />
          </div>
        </div>
      </div>

      <CartDialog isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;