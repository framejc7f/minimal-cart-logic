import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // В реальном приложении здесь был бы API запрос
  // Временно используем демо-данные
  const DEMO_PRODUCTS: Product[] = [
    {
      id: 1,
      name: "Minimal Chair",
      description: "A comfortable minimal chair for your home. Made from high-quality materials, this chair combines style and comfort. Perfect for any modern interior.",
      price: 199,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
    },
    {
      id: 2,
      name: "Modern Lamp",
      description: "Elegant desk lamp with adjustable brightness. Features modern design and energy-efficient LED technology. Ideal for work or reading.",
      price: 89,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    },
    {
      id: 3,
      name: "Wooden Table",
      description: "Handcrafted wooden table made from premium materials. Each piece is unique with natural wood grain patterns. Perfect centerpiece for your dining room.",
      price: 299,
      image: "https://images.unsplash.com/photo-1532372320978-9b4d0d359a2b?w=500",
    },
  ];

  const product = DEMO_PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="container mx-auto px-4 pt-24">Product not found</div>;
  }

  const handleAddToCart = () => {
    // Get current cart items
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already exists in cart
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // If product exists, increment quantity
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // If product doesn't exist, add it with quantity 1
      currentCart.push({ ...product, quantity: 1 });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // Dispatch custom event to update cart counter
    window.dispatchEvent(new Event("cartUpdated"));
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-black hover:bg-gray-800 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;