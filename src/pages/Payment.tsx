import { CreditCard, Wallet, Building } from "lucide-react";

const Payment = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-6">Оплата</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <CreditCard className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Банковской картой</h3>
            <p className="text-gray-600">
              Оплата картами Visa, MasterCard, МИР
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Wallet className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Наличными</h3>
            <p className="text-gray-600">
              Оплата наличными при получении
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Building className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Банковский перевод</h3>
            <p className="text-gray-600">
              Оплата по безналичному расчету
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Важная информация:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Оплата производится в рублях</li>
            <li>• Комиссия при оплате картой отсутствует</li>
            <li>• Безопасность платежей гарантируется использованием SSL протокола</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;