import { Telegram, Instagram, Mail, MapPin, Phone, VK } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Контакты</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>info@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>г. Москва, ул. Примерная, д. 1</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Информация</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-gray-900">О нас</Link>
              <Link to="/" className="block text-gray-600 hover:text-gray-900">Доставка</Link>
              <Link to="/" className="block text-gray-600 hover:text-gray-900">Оплата</Link>
              <Link to="/" className="block text-gray-600 hover:text-gray-900">Контакты</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Мы в соцсетях</h3>
            <div className="flex gap-4">
              <a href="https://t.me/example" target="_blank" rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900">
                <Telegram className="w-6 h-6" />
              </a>
              <a href="https://vk.com/example" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900">
                <VK className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-6 pt-4 text-center text-gray-600">
          <p>© 2024 Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;