
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      setQuantity(0);
      // Remove from cart
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = currentCart.filter((item: any) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateCart = (newQuantity: number) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity = newQuantity;
    } else {
      currentCart.push({ ...product, quantity: newQuantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleAddToCart = () => {
    setQuantity(1);
    onAddToCart(product);
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow animate-fadeIn">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-lg mb-2 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">${product.price}</p>
        
        {quantity > 0 ? (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decreaseQuantity}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={increaseQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
