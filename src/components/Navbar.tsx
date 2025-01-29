import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Store
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <Link
              to="/profile"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;