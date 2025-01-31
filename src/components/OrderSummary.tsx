interface OrderSummaryProps {
  region: string;
  total: number;
}

const OrderSummary = ({ region, total }: OrderSummaryProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Регион доставки:</span>
        <span>{region}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Итоговая сумма:</span>
        <span>{total} ₽</span>
      </div>
    </div>
  );
};

export default OrderSummary;