import { Truck, Package, Clock } from "lucide-react";

const Delivery = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-6">Доставка</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <Truck className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Быстрая доставка</h3>
            <p className="text-gray-600">
              Доставляем заказы по Москве в течение 1-2 дней
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Package className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Надежная упаковка</h3>
            <p className="text-gray-600">
              Все товары надежно упакованы для безопасной транспортировки
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Clock className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Удобное время</h3>
            <p className="text-gray-600">
              Доставка в удобное для вас время с 9:00 до 21:00
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Стоимость доставки:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• По Москве в пределах МКАД - 500 ₽</li>
            <li>• За МКАД - 500 ₽ + 30 ₽/км</li>
            <li>• Самовывоз из магазина - бесплатно</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Delivery;