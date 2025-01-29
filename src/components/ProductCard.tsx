import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
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
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-black hover:bg-gray-800 text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;