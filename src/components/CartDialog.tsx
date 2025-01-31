import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import CartItems from "./CartItems";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";

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
  
  const { toast } = useToast();

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const deliveryPrices = {
    cdek: 672.5,
    post: 776.0,
    cnf: 2000.0,
    international: 4500.0
  };
  const total = subtotal + (deliveryPrices[formData.delivery as keyof typeof deliveryPrices] || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    toast({
      title: "Заказ успешно оформлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
    });
    onOpenChange(false);
    localStorage.setItem("cart", "[]");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ваш заказ:</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CartItems items={cartItems} subtotal={subtotal} />
          <OrderForm formData={formData} setFormData={setFormData} />
          <OrderSummary region={formData.region} total={total} />
          <Button type="submit" className="w-full bg-black hover:bg-gray-800">
            Перейти к оплате
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
