import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import CartItems from "./CartItems";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import { CartItem } from "@/types/product";
interface CartDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDialog = ({ isOpen, onOpenChange }: CartDialogProps) => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    city: "Екатеринбург",
    region: "Россия, Свердловская область, г. Екатеринбург",
    delivery: "cdek",
    pickupPoint: "",
    recipient: "",
    giftCertificate: "",
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast: uiToast } = useToast(); 

  useEffect(() => {
    const loadCart = () => {
      const items = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(items);
    };

    if (isOpen) {
      loadCart(); 
    }

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [isOpen]); 

  const updateCartStorageAndNotify = (updatedItems: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleUpdateQuantity = (itemId: number, change: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    updateCartStorageAndNotify(updatedItems);
  };

  const handleRemoveItem = (itemId: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    updateCartStorageAndNotify(updatedItems);
    uiToast({
      title: "Товар удален",
      description: "Товар был удален из корзины.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrices = {
    cdek: 672.5,
    post: 776.0,
    cnf: 2000.0,
    international: 4500.0
  };
  const deliveryCost = deliveryPrices[formData.delivery as keyof typeof deliveryPrices] || 0;
  const total = subtotal + deliveryCost;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", formData, cartItems); 
    uiToast({ 
      title: "Заказ успешно оформлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
    });
    onOpenChange(false);
    setCartItems([]);
    updateCartStorageAndNotify([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* Adjusted max-w for potentially wider content */}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ваш заказ:</DialogTitle>
        </DialogHeader>
        {cartItems.length === 0 ? (
           <p className="text-center text-gray-500 py-4">Ваша корзина пуста</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <CartItems
              items={cartItems}
              subtotal={subtotal}
              onUpdateQuantity={handleUpdateQuantity} // Pass handler
              onRemove={handleRemoveItem}             // Pass handler
            />
            <OrderForm formData={formData} setFormData={setFormData} />
            <OrderSummary region={formData.region} total={total} />
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Перейти к оплате
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

// export default CartDialog;
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import { useState } from "react";
// import CartItems from "./CartItems";
// import OrderForm from "./OrderForm";
// import OrderSummary from "./OrderSummary";

// interface CartDialogProps {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const CartDialog = ({ isOpen, onOpenChange }: CartDialogProps) => {
//   const [formData, setFormData] = useState({
//     phone: "",
//     email: "",
//     city: "Екатеринбург",
//     region: "Россия, Свердловская область, г. Екатеринбург",
//     delivery: "cdek",
//     pickupPoint: "",
//     recipient: "",
//     giftCertificate: "",
//   });
  
//   const { toast } = useToast();

//   const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
//   const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
//   const deliveryPrices = {
//     cdek: 672.5,
//     post: 776.0,
//     cnf: 2000.0,
//     international: 4500.0
//   };
//   const total = subtotal + (deliveryPrices[formData.delivery as keyof typeof deliveryPrices] || 0);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Order submitted:", formData);
//     toast({
//       title: "Заказ успешно оформлен!",
//       description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
//     });
//     onOpenChange(false);
//     localStorage.setItem("cart", "[]");
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Ваш заказ:</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <CartItems items={cartItems} subtotal={subtotal} />
//           <OrderForm formData={formData} setFormData={setFormData} />
//           <OrderSummary region={formData.region} total={total} />
//           <Button type="submit" className="w-full bg-black hover:bg-gray-800">
//             Перейти к оплате
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CartDialog;
