import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

const cities = [
  { value: "moscow", label: "Москва", region: "Россия, г. Москва" },
  { value: "spb", label: "Санкт-Петербург", region: "Россия, г. Санкт-Петербург" },
  { value: "ekb", label: "Екатеринбург", region: "Россия, Свердловская область, г. Екатеринбург" },
  { value: "nsk", label: "Новосибирск", region: "Россия, Новосибирская область, г. Новосибирск" },
  { value: "kzn", label: "Казань", region: "Россия, Республика Татарстан, г. Казань" },
  { value: "nnov", label: "Нижний Новгород", region: "Россия, Нижегородская область, г. Нижний Новгород" },
  { value: "chel", label: "Челябинск", region: "Россия, Челябинская область, г. Челябинск" },
  { value: "krd", label: "Краснодар", region: "Россия, Краснодарский край, г. Краснодар" },
];

const OrderForm = ({ formData, setFormData }: OrderFormProps) => {
  const [open, setOpen] = useState(false);

  // Add console logs to help debug the issue
  console.log("Current formData:", formData);
  console.log("Cities array:", cities);

  const handleCitySelect = (cityLabel: string) => {
    const selectedCity = cities.find((city) => city.label === cityLabel);
    if (selectedCity) {
      setFormData({
        ...formData,
        city: selectedCity.label,
        region: selectedCity.region,
      });
    }
    setOpen(false);
  };

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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {formData.city
                ? cities.find((city) => city.label === formData.city)?.label || "Выберите город..."
                : "Выберите город..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Поиск города..." />
              <CommandEmpty>Город не найден.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={() => handleCitySelect(city.label)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        formData.city === city.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="text-sm text-gray-500 mt-1">{formData.region}</div>
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