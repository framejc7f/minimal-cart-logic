import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  cartItemsCount: number;
  onClick: () => void;
}

const CartButton = ({ cartItemsCount, onClick }: CartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
    >
      <ShoppingCart className="w-6 h-6" />
      {cartItemsCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemsCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;