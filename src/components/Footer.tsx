import { MessageCircle, Instagram, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Контакты</h3>
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
            <h3 className="font-semibold text-lg mb-2">Информация</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-600 hover:text-gray-900">О нас</Link>
              <Link to="/delivery" className="block text-gray-600 hover:text-gray-900">Доставка</Link>
              <Link to="/payment" className="block text-gray-600 hover:text-gray-900">Оплата</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Мы в соцсетях</h3>
            <div className="flex gap-4">
              <a href="https://t.me/stepbystepsneakers" target="_blank" rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://vk.com/example" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-4 pt-4 text-center text-gray-600">
          <p>© 2025 Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;