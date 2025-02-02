import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfoProps {
  phone: string;
  email: string;
  recipient: string;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onRecipientChange: (value: string) => void;
}

const ContactInfo = ({
  phone,
  email,
  recipient,
  onPhoneChange,
  onEmailChange,
  onRecipientChange,
}: ContactInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Номер телефона*</Label>
        <Input
          type="tel"
          placeholder="+7 (999) 999-99-99"
          required
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
      </div>

      <div>
        <Label>Email*</Label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </div>

      <div>
        <Label>Получатель (ФИО полностью)</Label>
        <Input
          placeholder="Иванов Иван Иванович"
          required
          value={recipient}
          onChange={(e) => onRecipientChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContactInfo;