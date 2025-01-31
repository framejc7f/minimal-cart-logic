import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartItemsCount(totalItems);

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newTotalItems = updatedCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartItemsCount(newTotalItems);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    toast({
      title: "Заказ успешно оформлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
    });
    setIsCartOpen(false);
    localStorage.setItem("cart", "[]");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const deliveryPrices = {
    cdek: 672.5,
    post: 776.0,
    cnf: 2000.0,
    international: 4500.0
  };
  const total = subtotal + (deliveryPrices[formData.delivery as keyof typeof deliveryPrices] || 0);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Store
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ваш заказ:</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">Размер: S</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{item.quantity}</span>
                    <span className="font-medium">{item.price} ₽</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between font-medium pt-2">
                <span>Сумма:</span>
                <span>{subtotal} ₽</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Номер телефона*</Label>
                <Input
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label>Email*</Label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Label>Доставка</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Город"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  <div className="text-sm text-gray-500">{formData.region}</div>
                </div>
              </div>

              <RadioGroup
                value={formData.delivery}
                onValueChange={(value) => setFormData({ ...formData, delivery: value })}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cdek" id="cdek" />
                  <Label htmlFor="cdek">СДЭК от 3 дней, от 672.5 ₽</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="post" id="post" />
                  <Label htmlFor="post">Отправка Почтой России от 1 дня, от 776.00 ₽</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cnf" id="cnf" />
                  <Label htmlFor="cnf">CNF от 7 дней, 2 000 ₽</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="international" id="international" />
                  <Label htmlFor="international">Европа / Америка от 20 дней, 4 500 ₽</Label>
                </div>
              </RadioGroup>

              <div>
                <Label>Пункт получения</Label>
                <Input
                  placeholder="Выберите пункт получения"
                  value={formData.pickupPoint}
                  onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                />
              </div>

              <div>
                <Label>Получатель (ФИО полностью)</Label>
                <Input
                  placeholder="Иванов Иван Иванович"
                  required
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                />
              </div>

              <div>
                <Label>Подарочный сертификат</Label>
                <Input
                  value={formData.giftCertificate}
                  onChange={(e) => setFormData({ ...formData, giftCertificate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Регион доставки:</span>
                <span>{formData.region}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Итоговая сумма:</span>
                <span>{total} ₽</span>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Перейти к оплате
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;