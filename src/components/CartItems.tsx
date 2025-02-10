
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";

interface CartItemsProps {
  items: CartItem[];
  subtotal: number;
  onUpdateQuantity?: (itemId: number, change: number) => void;
  onRemove?: (itemId: number) => void;
}

const CartItems = ({ items, subtotal, onUpdateQuantity, onRemove }: CartItemsProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b pb-2">
          <div className="flex gap-4">
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">Размер: S</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity?.(item.id, -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity?.(item.id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="font-medium min-w-20 text-right">{item.price} ₽</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-600 h-8 w-8"
              onClick={() => onRemove?.(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between font-medium pt-2">
        <span>Сумма:</span>
        <span>{subtotal} ₽</span>
      </div>
    </div>
  );
};

export default CartItems;
