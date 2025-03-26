import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);

  // В реальном приложении здесь был бы API запрос
  // Временно используем демо-данные
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
      // Remove from cart
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
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product?.id);
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity = newQuantity;
    } else {
      currentCart.push({ ...product, quantity: newQuantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleAddToCart = () => {
    // Set quantity to 1 when adding to cart
    setQuantity(1);
    updateCart(1);
    
    // Show toast notification
    toast({
      title: "Добавлено в корзину",
      description: `${product?.name} добавлен в вашу корзину.`,
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
        Назад
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          
          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-xl">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-black hover:bg-gray-800 text-white"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Смотрите также</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {relatedProducts.map((relatedProduct) => (
              <CarouselItem key={relatedProduct.id} className="md:basis-1/2 lg:basis-1/3">
                <Link to={`/product/${relatedProduct.id}`}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-square overflow-hidden rounded-lg mb-4">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                      <p className="text-lg font-semibold">${relatedProduct.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductDetails;
