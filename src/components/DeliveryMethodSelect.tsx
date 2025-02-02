import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DeliveryMethodSelectProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

const DeliveryMethodSelect = ({ selectedMethod, onMethodSelect }: DeliveryMethodSelectProps) => {
  return (
    <RadioGroup
      value={selectedMethod}
      onValueChange={onMethodSelect}
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
  );
};

export default DeliveryMethodSelect;