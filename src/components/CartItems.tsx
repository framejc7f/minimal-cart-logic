interface CartItemsProps {
  items: any[];
  subtotal: number;
}

const CartItems = ({ items, subtotal }: CartItemsProps) => {
  return (
    <div className="space-y-2">
      {items.map((item: any) => (
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
  );
};

export default CartItems;