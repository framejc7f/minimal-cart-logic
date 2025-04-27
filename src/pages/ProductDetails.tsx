import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import ProductImageDisplay from "@/components/product/ProductImageDisplay";
import ProductInfo from "@/components/product/ProductInfo";
import ProductActions from "@/components/product/ProductActions";
import RelatedProducts from "@/components/product/RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);

  const DEMO_PRODUCTS: Product[] = [
    {
      id: 1,
      name: "Minimal Chair",
      description: "A comfortable minimal chair for your home. Made from high-quality materials, this chair combines style and comfort. Perfect for any modern interior.",
      price: 199,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
      brand: "Minimal Home"
    },
    {
      id: 2,
      name: "Modern Lamp",
      description: "Elegant desk lamp with adjustable brightness. Features modern design and energy-efficient LED technology. Ideal for work or reading.",
      price: 89,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
      brand: "Modern Light"
    },
    {
      id: 3,
      name: "Wooden Table",
      description: "Handcrafted wooden table made from premium materials. Each piece is unique with natural wood grain patterns. Perfect centerpiece for your dining room.",
      price: 299,
      image: "https://images.unsplash.com/photo-1532372320978-9b4d0d359a2b?w=500",
      brand: "Minimal Home"
    },
  ];

  const product = DEMO_PRODUCTS.find((p) => p.id === Number(id));
  const relatedProducts = DEMO_PRODUCTS.filter((p) => p.id !== Number(id));

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      setQuantity(0);
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = currentCart.filter((item: any) => item.id !== product?.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
    }
  };

  const updateCart = (newQuantity: number) => {
    if (!product) return;
    
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
    if (!product) return;
    
    setQuantity(1);
    updateCart(1);
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
    });
  };

  if (!product) {
    return <div className="container mx-auto px-4 pt-24">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 hover:bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <ProductImageDisplay image={product.image} name={product.name} />
        <div className="space-y-6">
          <ProductInfo 
            name={product.name} 
            price={product.price} 
            description={product.description} 
          />
          <ProductActions
            product={product}
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetails;
