import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CitySelect from "./CitySelect";
import DeliveryMethodSelect from "./DeliveryMethodSelect";
import ContactInfo from "./ContactInfo";

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
  const handleCitySelect = (city: { label: string; region: string }) => {
    setFormData({
      ...formData,
      city: city.label,
      region: city.region,
    });
  };

  return (
    <div className="space-y-4">
      <ContactInfo
        phone={formData.phone}
        email={formData.email}
        recipient={formData.recipient}
        onPhoneChange={(value) => setFormData({ ...formData, phone: value })}
        onEmailChange={(value) => setFormData({ ...formData, email: value })}
        onRecipientChange={(value) => setFormData({ ...formData, recipient: value })}
      />

      <CitySelect
        cities={cities}
        selectedCity={formData.city}
        selectedRegion={formData.region}
        onCitySelect={handleCitySelect}
      />

      <DeliveryMethodSelect
        selectedMethod={formData.delivery}
        onMethodSelect={(method) => setFormData({ ...formData, delivery: method })}
      />

      <div>
        <Label>Пункт получения</Label>
        <Input
          placeholder="Выберите пункт получения"
          value={formData.pickupPoint}
          onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
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