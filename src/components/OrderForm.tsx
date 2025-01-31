import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OrderFormProps {
  formData: {
    phone: string;
    email: string;
    city: string;
    region: string;
    delivery: string;
    pickupPoint: string;
    recipient: string;
    giftCertificate: string;
  };
  setFormData: (data: any) => void;
}

const OrderForm = ({ formData, setFormData }: OrderFormProps) => {
  return (
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
  );
};

export default OrderForm;