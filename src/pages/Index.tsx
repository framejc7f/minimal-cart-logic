
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Временные данные для демонстрации
const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Minimal Chair",
    description: "A comfortable minimal chair for your home",
    price: 199,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
    brand: "Minimal Home",
  },
  {
    id: 2,
    name: "Modern Lamp",
    description: "Elegant desk lamp with adjustable brightness",
    price: 89,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    brand: "Modern Light",
  },
  {
    id: 3,
    name: "Wooden Table",
    description: "Handcrafted wooden table made from premium materials",
    price: 299,
    image: "https://images.unsplash.com/photo-1532372320978-9b4d0d359a2b?w=500",
    brand: "Minimal Home",
  },
  {
    id: 4,
    name: "Designer Chair",
    description: "Modern designer chair with ergonomic design",
    price: 249,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
    brand: "Modern Light",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [products] = useState<Product[]>(DEMO_PRODUCTS);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const allBrands = Array.from(new Set(products.map((product) => product.brand)));

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      selectedBrands.length === 0 || selectedBrands.includes(product.brand)
  );

  const handleAddToCart = (product: Product) => {
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
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Filter by Brand</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 pb-4">
            {allBrands.map((brand) => (
              <Badge
                key={brand}
                variant={selectedBrands.includes(brand) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors"
                onClick={() => handleBrandToggle(brand)}
              >
                {brand}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
