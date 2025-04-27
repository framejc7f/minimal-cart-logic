
import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";

interface ProductActionsProps {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onAddToCart: () => void;
}

const ProductActions = ({ 
  product, 
  quantity, 
  onIncrease, 
  onDecrease, 
  onAddToCart 
}: ProductActionsProps) => {
  return (
    <div className="mt-6">
      {quantity > 0 ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={onDecrease}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-xl">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={onIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          onClick={onAddToCart}
          className="w-full md:w-auto bg-black hover:bg-gray-800 text-white"
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default ProductActions;
